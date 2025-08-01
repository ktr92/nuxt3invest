/**
 * Модуль для обработки данных по торговым инструментам с сервера
 */
import { groupBy, flatten } from "lodash-es"

const serviceApiData = {
  /**
   * Получить самую раннюю дату сделки из всего портфеля,
   * которая нужна для левой границы отрисовки графика типа "за все время"
   * @param loadData - данные портфеля
   * @returns {Date} - самая ранняя дата
   */
  getFirstDate(loadData: Array<IPortfolioData>): Date {
    return loadData
      .map((item: IPortfolioData) => new Date(item.openDate))
      .reduce((a, b) => (a < b ? a : b))
  },

  /**
   * Получить тикер по индексу из функции перебора упордяоченного списка инструментов
   * @param shares - ответ по запросу информации по инструментам
   * @param instrumentId - упорядоченный список идентификаторов инструментов содержащихся в нашем портфеле
   * @param index - индекс текущего инструмента в упорядоченном списке инструментов
   * @returns {string} - тикер инструментв
   */
  getTicker(
    shares: APISharesResponse,
    instrumentId: Array<{ id: string }>,
    index: number
  ): string {
    return shares.filter(
      (share: APIShare[]) => share[0].figi === instrumentId[index].id
    )[0][0].ticker
  },

  /**
   * получить количество активов в портфеле по тикеру
   * @param loadData
   * @param ticker
   * @returns
   */
  getTickerCount(loadData: IPortfolioData[], ticker: string): number {
    return loadData.filter((item: IPortfolioData) => item.ticker === ticker)[0].count
  },
  /**
   * Получить дату открытия позиции, от которой будет строиться график
   * @param alltime - за все время или нет
   * @param from - текущая левая границы дат выбранная на графика
   * @param ticker - тикер обрабатываемого инструмента
   * @param loadData - данные портфеля
   * @returns - стровое представление даты открытя позици
   */
  getOpenDate(
    alltime: boolean,
    from: Date,
    ticker: string,
    loadData: Array<IPortfolioData>
  ): string {
    return alltime
      ? from.toISOString()
      : loadData.filter((share: IPortfolioData) => share.ticker === ticker)[0]
          .openDate
  },
  /**
   * Получить цену при открытии позиции
   * @param ticker - тикер обрабатываемого инструмента
   * @param loadData - данные портфеля
   * @returns - цена открытия позиции в портфеле
   */
  getOpenPrice(loadData: Array<IPortfolioData>, ticker: string): number {
    return loadData.filter((item) => item.ticker === ticker)[0].price
  },

  /**
   * Получиь цену на основе структуры из ответа сервера (цена приходит в виде {units: string, nano: number})
   * @param price {IPrice}
   * @returns цена в формате десятичной дроби
   */
  formatPrice(price: IPrice): number {
    return Number(`${price.units}.${price.nano}`)
  },

  /**
   * @param loadData - данные из портфеля
   * @param candles - данные с ценами по инструменту из ответа сервера
   * @param from - левая граница диапазона дат
   * @param shares - информация об инструменте (нужно для сопоставления идентификатора инструмента в системе)
   * @param instrumentId - упорядоченный список идентификаторов инструменов
   * @param alltime - флаг от которого зависит как строить график - от левой границы фильтра или с момента первой сделки по этому инструменту
   * @returns {LineData[]} - данные для постоения линейного графика
   */
  dataToChart(
    loadData: IPortfolioData[],
    candles: ICandleData[][],
    from: Date,
    shares: APISharesResponse,
    instrumentId: Array<{ id: string }>,
    alltime: boolean
  ): LineData[] {
    return [
      {
        id: "",
        dates: [],
      },
    ]
  },

  /**
   * получить разницу в днях между двумя датами
   * @param itemdate - проверяемая дата из набора дат
   * @param prevdate - прошлая дата из набора дат
   * @returns {number} - разницы между входными датами в днях
   */
  getDateDiff(itemdate: Date, prevdate: Date): number {
    return Math.ceil(
      Math.abs(itemdate.getTime() - prevdate.getTime()) / (1000 * 3600 * 24)
    )
  },

  /**
   * получить вчерашний день
   * @param itemdate - текущий день
   * @returns {string} -  вчерашний день в виде строки
   */
  getYesterday(itemdate: Date): string {
    return new Date(itemdate.setDate(itemdate.getDate() - 1)).toISOString()
  },
  /**
   * в ответе сервера по активам может не быть дней, когда актив не торгуется(выходные). При этом другие активы могут торговаться в эти дни. Поэтому надо заполнить недостающие даты и сохранить значение цены до выходного дня.
   * @param from - исходный
   * @param totalEach - исходный массив
   * @returns {Array<DatePrice>} - заполненный массив
   */
  addMissingDates(totalEach: Array<DatePrice>): Array<DatePrice> {
    // заполняем пустые даты
    let prevdate = new Date(totalEach[0].date)
    let prevValue = totalEach[0].value
    const resultEach: DatePrice[] = []

    let i = 0
    while (i < totalEach.length) {
      // Текущая дата
      const item = totalEach[i]
      const itemdate = new Date(item.date)

      // Разница текущей даты и предыдущей, в днях
      let datediff = serviceApiData.getDateDiff(itemdate, prevdate)
      // если пропущен день, то добавляем предыдущий вчерашний день в массив до тех пор пока разницы в днях от текущей даты то предыдущей не станет 1. Разница в днях может быть только 1, но от сервера будут пропущены выходные и праздничные дни когда нет торгов.
      if (datediff > 1) {
        while (datediff > 1) {
          const newdate = serviceApiData.getYesterday(itemdate);
          resultEach.push({
            value: prevValue,
            date: newdate,
          })
          // после добавления элемента, уменьшаем разницу
          datediff--
        }
      }

      // текущая дата и цена станет предыдущей для следующего элемента.
      prevdate = new Date(item.date)
      prevValue = item.value
      resultEach.push(item)
      i++
    }

    return resultEach
  },

  /**
   * Обработчик данных для графика суммарной стоимости всех позиций в портфеле. На основе ответа с информацией об исторических данных инструмента составляет данные для вывода на графике в формате "дата-значение"
   @param candlesAPI - интерфейс для преборазования набора данных по ценам из api в массив пар дата-значения для постоения графика
   */
  timeTotalHandler(candlesAPI: ICandlesToLine): LineData[] {
    const dvTotal = candlesAPI.candles.map(
      (res: ICandleData[], index: number) => {
        const ticker = serviceApiData.getTicker(
          candlesAPI.shares,
          candlesAPI.instrumentId,
          index
        )
        const count = serviceApiData.getTickerCount(candlesAPI.loadData, ticker)

        let opendate = new Date(
          serviceApiData.getOpenDate(
            candlesAPI.alltime,
            candlesAPI.from,
            ticker,
            candlesAPI.loadData
          )
        )

        // стоимость каждой позиции
        const totalEach = res.map((item: ICandleData, index: number) => {
          const itemdate = new Date(item.time)

          const close =
            opendate <= itemdate
              ? serviceApiData.formatPrice(item.close) * count
              : 0

          return {
            value: Number(close),
            date: new Date(item.time).toISOString(), // приводим к единому формату
          }
        })

        const resultEach = serviceApiData.addMissingDates(totalEach)

        return resultEach
      }
    )
    // все массивы складываем в один общий и группируем по датам
    const grouped = groupBy(flatten(dvTotal), "date")
    // массив для суммы позиций по датам
    const totalArray = []
    for (const [key, value] of Object.entries(grouped)) {
      const initialValue = 0

      totalArray.push({
        date: key,
        value: value.reduce((acc, val) => val.value + acc, initialValue),
      })
    }

    return [
      {
        dates: totalArray,
        id: "сумма",
      },
    ]
  },

  /**
   * Обработчик данных для графика изменения цены каждой позиции от даты открытя позиции
   @param candlesAPI - интерфейс для преборазования набора данных по ценам из api в массив пар дата-значения для постоения графика
   */
  timeprofitHandler(candlesAPI: ICandlesToLine): LineData[] {
    // обработка каждого из рельзутатов promise.all

    return candlesAPI.candles.map((res: any, index: number) => {
      const ticker = serviceApiData.getTicker(
        candlesAPI.shares,
        candlesAPI.instrumentId,
        index
      )
      // цена покупки
      let openprice = serviceApiData.getOpenPrice(candlesAPI.loadData, ticker)
      // дата покупки
      let opendate = serviceApiData.getOpenDate(
        candlesAPI.alltime,
        candlesAPI.from,
        ticker,
        candlesAPI.loadData
      )

      // для изменения периода менять отсчет
      if (new Date(opendate) < candlesAPI.from) {
        const tmp: Date = new Date(
          candlesAPI.from.setDate(candlesAPI.from.getDate() - 1)
        )
        opendate = tmp.toISOString()
        openprice = Number(
          serviceApiData.formatPrice(candlesAPI.candles[index][0].open)
        )
      }

      return {
        id: ticker, // figi
        dates: res.map((item: any) => {
          const close = serviceApiData.formatPrice(item.close)
          const percent =
            ((Number(close) - openprice) / Number(openprice)) * 100

          return {
            value: Number(percent),
            date: item.time,
          }
        }),
        opendate,
        openprice,
      }
    })
  },

  /**
   *
   * @param candlesAPI
   * @returns
   */
  timePriceHander(candlesAPI: ICandlesToLine): LineData[] {
    return candlesAPI.candles.map((res: ICandleData[], index: number) => {
      const ticker = serviceApiData.getTicker(
        candlesAPI.shares,
        candlesAPI.instrumentId,
        index
      )

      const count = serviceApiData.getTickerCount(candlesAPI.loadData, ticker)

      let opendate = serviceApiData.getOpenDate(
        candlesAPI.alltime,
        candlesAPI.from,
        ticker,
        candlesAPI.loadData
      )

      return {
        dates: res.map((item: ICandleData) => {
          const close = serviceApiData.formatPrice(item.close)
          return {
            value: Number(close) * count,
            date: item.time,
          }
        }),
        id: ticker,
        opendate,
      }
    })
  },

  
 getfirstDate(loadData: IPortfolioData[]) {
  return loadData
    .map((item) => new Date(item.openDate))
    .reduce((a, b) => (a < b ? a : b))
 }

  /*   getEveryDate(target: DatePrice, newdate: string, olddate: string) {
    target.map()
  } */
}

export default serviceApiData
