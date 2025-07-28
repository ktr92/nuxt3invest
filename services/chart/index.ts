import { groupBy, flatten } from "lodash-es"

const serviceChart = {
  /**
   * Получить самую раннюю дату сделки из всего портфеля,
   * которая нужна для левой границы отрисовки графика типа "за все время"
   * @param loadData - данные портфеля
   * @returns {Date} - самая ранняя дата
   */
  getFirstDate(loadData: Array<ILoadData>): Date {
    return loadData
      .map((item: ILoadData) => new Date(item.openDate))
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
    loadData: Array<ILoadData>
  ): string {
    return alltime
      ? from.toISOString()
      : loadData.filter((share: ILoadData) => share.ticker === ticker)[0]
          .openDate
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
    loadData: ILoadData[],
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
   * Обработчик данных для графика суммарной стоимости всех позиций в портфеле. На основе ответа с информацией об исторических данных инструмента составляет данные для вывода на графике в формате "дата-значение"
   
   */
  timeTotalHandler(
    loadData: ILoadData[],
    candles: ICandleData[][],
    from: Date,
    shares: APISharesResponse,
    instrumentId: Array<{ id: string }>,
    alltime: boolean
  ): LineData[] {
    const dvTotal = candles.map((res: ICandleData[], index: number) => {
      const ticker = serviceChart.getTicker(shares, instrumentId, index)
      const count = loadData.filter((item) => item.ticker === ticker)[0].count
      let opendate = new Date(
        serviceChart.getOpenDate(alltime, from, ticker, loadData)
      )

      // стоимость каждой позиции
      const totalEach = res.map((item: ICandleData) => {
        const itemdate = new Date(item.time)
        const close =
          opendate <= itemdate
            ? serviceChart.formatPrice(item.close) * count
            : 0
        return {
          value: Number(close),
          date: item.time,
        }
      })

      return totalEach
    })
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
}

export default serviceChart
