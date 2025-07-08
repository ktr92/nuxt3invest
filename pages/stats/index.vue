<template>
  <div class="w-full" ref="chartcontainer">
    <ClientOnly class="w-full">
      <!--   <ChartCDataTimePrice :loadData="loadData" :width="width" />
      <ChartCDataTimeProfit :loadData="loadData" :width="width" /> -->
      <ChartCDataTimeValue
        title="Стоимость портфеля"
        :loadData="loadData"
        :width="width"
        :dataHandler="timeTotalHandler"
        units=" ₽"
      />
      <ChartCDataTimeValue
        title="Доходность"
        :loadData="loadData"
        :width="width"
        :dataHandler="timeprofitHandler"
        units="%"
      />
      <ChartCDataTimeValue
        title="Стоимость позиции"
        :loadData="loadData"
        :width="width"
        :dataHandler="timePriceHander"
        units=" ₽"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { groupBy, flatten } from "lodash-es"


const getFirstDate = () =>
  loadData
    .map((item) => new Date(item.openDate))
    .reduce((a, b) => (a < b ? a : b))

const getTicker = (
  shares: APISharesResponse,
  instrumentId: Array<{ id: string }>,
  index: number
) =>
  shares.filter(
    (share: APIShare[]) => share[0].figi === instrumentId[index].id
  )[0][0].ticker

const getOpenDate = (alltime: boolean, from: Date, ticker: string) =>
  alltime
    ? from.toISOString()
    : loadData.filter((share: ILoadData) => share.ticker === ticker)[0].openDate

const formatPrice = (price: any) => Number(`${price.units}.${price.nano}`)

const timeTotalHandler = (
  candles: ICandleData[][],
  from: Date,
  shares: APISharesResponse,
  instrumentId: Array<{ id: string }>,
  alltime: boolean
) => {
  const dvTotal = candles.map((res: ICandleData[], index: number) => {
    const ticker = getTicker(shares, instrumentId, index)
    const count = loadData.filter((item) => item.ticker === ticker)[0].count
    let opendate = new Date(getOpenDate(alltime, from, ticker))

    // стоимость каждой позиции
    const totalEach = res.map((item: ICandleData) => {
        const itemdate = new Date(item.time) 
        const close = opendate <= itemdate ? formatPrice(item.close) * count : 0
        return {
          value: Number(close),
          date: item.time
        }
      })
    
    return totalEach

    
  })
 console.log(dvTotal)
  // все массивы складываем в один общий и группируем по датам
  const grouped = groupBy(flatten(dvTotal), 'date')

  // массив для суммы позиций по датам
  const totalArray = []
  for (const [key, value] of Object.entries(grouped)) {
    const initialValue = 0;

    totalArray.push({
      date: key,
      value: value.reduce((acc, val) => val.value + acc, initialValue)
    })
  }

 

  return [{
    dates: totalArray,
    id: 'сумма'
  }]
   
 /*  return {
      dates: grouped.keys().map((item: ICandleData) => {
        const close = formatPrice(item.close) * count
        return {
          value: Number(close),
          date: item.time,
        }
      }),
      id: "",
      opendate,
    } */
}

const timePriceHander = (
  candles: any,
  from: Date,
  shares: APISharesResponse,
  instrumentId: Array<{ id: string }>,
  alltime: boolean
) => {
  return candles.map((res: any, index: number) => {
    const ticker = getTicker(shares, instrumentId, index)
    const count = loadData.filter((item) => item.ticker === ticker)[0].count
    let opendate = getOpenDate(alltime, from, ticker)

    return {
      dates: res.map((item: any) => {
        const close = formatPrice(item.close)
        return {
          value: Number(close) * count,
          date: item.time,
        }
      }),
      id: ticker,
      opendate,
    }
  })
}

const timeprofitHandler = (
  candles: any,
  from: Date,
  shares: APISharesResponse,
  instrumentId: Array<{ id: string }>,
  alltime: boolean
) => {
  // обработка каждого из рельзутатов promise.all

  return candles.map((res: any, index: number) => {
    const ticker = getTicker(shares, instrumentId, index)
    // цена покупки
    let openprice = loadData.filter((item) => item.ticker === ticker)[0].price
    // дата покупки
    let opendate = getOpenDate(alltime, from, ticker)

    // для изменения периода менять отсчет
    if (new Date(opendate) < from) {
      const tmp: Date = new Date(from.setDate(from.getDate() - 1))
      opendate = tmp.toISOString()
      openprice = Number(formatPrice(candles[index][0].open))
    }

    return {
      id: ticker, // figi
      dates: res.map((item: any) => {
        const close = formatPrice(item.close)
        const percent = ((Number(close) - openprice) / Number(openprice)) * 100

        return {
          value: Number(percent),
          date: item.time,
        }
      }),
      opendate,
      openprice,
    }
  })
}

const chartcontainer = ref<HTMLDivElement | null>(null)

const width = computed(() =>
  chartcontainer.value ? chartcontainer.value.clientWidth : 600
)

// информация о портфеле грузится из БД
const loadData: ILoadData[] = [
  {
    ticker: "ROSN",
    isin: "RU000A0J2Q06",
    name: "Роснефть",
    count: 180,
    price: 572,
    newprice: 380,
    pricechange: -40,
    total: 500,
    change: -6,
    yearchange: 11,
    openDate: "2024-01-18",
    share: 30,
  },
  {
    ticker: "ASTR",
    isin: "RU000A106T36",
    name: "Астра",
    count: 250,
    price: 460,
    newprice: 567,
    pricechange: 22,
    total: 500,
    change: 10,
    yearchange: -20,
    openDate: "2024-12-02",

    share: 25,
  },
  {
    ticker: "SBER",
    isin: "RU0009029540",
    name: "Сбербанк",
    count: 300,
    price: 240,
    newprice: 567,
    pricechange: 22,
    total: 500,
    yearchange: -20,
    change: 10,
    openDate: "2024-11-02",
    share: 25,
  },
  {
    ticker: "BANEP",
    isin: "RU0007976965",
    name: "Башнефть-п",
    count: 127,
    price: 1269,
    newprice: 567,
    pricechange: 22,
    total: 500,
    yearchange: -20,
    change: 10,
    openDate: "2025-02-28",
    share: 25,
  },
]

/* 
console.log("chartData :", chartData.value) */
</script>
