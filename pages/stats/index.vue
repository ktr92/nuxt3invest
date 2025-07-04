<template>
  <div class="w-full" ref="chartcontainer">
    <ClientOnly class="w-full">
      <!--   <ChartCDataTimePrice :loadData="loadData" :width="width" />
      <ChartCDataTimeProfit :loadData="loadData" :width="width" /> -->
      <ChartCDataTimeValue
        title="Доходность"
        :loadData="loadData"
        :width="width"
        :dataHandler="timeprofitHandler"
      />
      <ChartCDataTimeValue
        title="Стоимость позиции"
        :loadData="loadData"
        :width="width"
        :dataHandler="timePriceHander"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const timePriceHander = (
  candles: any,
  from: Date,
  shares: APISharesResponse,
  instrumentId: Array<{ id: string }>,
  alltime: boolean
) => {
  return candles.map((res: any, index: number) => {
    const ticker = shares.filter(
      (share: APIShare[]) => share[0].figi === instrumentId[index].id
    )[0][0].ticker

    const count = loadData.filter((item) => item.ticker === ticker)[0].count

    return {
      dates: res.map((item: any) => {
        const open = `${item.open.units}.${item.open.nano}`
        const close = `${item.close.units}.${item.close.nano}`
        const change = ((Number(close) - Number(open)) / Number(open)) * 100
        return {
          value: Number(close) * count,
          date: item.time,
        }
      }),
      id: ticker,
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
    const ticker = shares.filter(
      (share: APIShare[]) => share[0].figi === instrumentId[index].id
    )[0][0].ticker

    // цена покупки
    let openprice = loadData.filter((item) => item.ticker === ticker)[0].price

    // дата покупки
    let opendate = alltime
      ? from.toISOString()
      : loadData.filter((share: ILoadData) => share.ticker === ticker)[0]
          .openDate

    // для изменения периода менять отсчет
    if (new Date(opendate) < from) {
      const tmp: Date = new Date(from.setDate(from.getDate() - 1))
      opendate = tmp.toISOString()
      openprice = Number(
        `${candles[index][0].open.units}.${candles[0][0].open.nano}`
      )
    }

    return {
      id: ticker, // figi
      dates: res.map((item: any) => {
        const close = `${item.close.units}.${item.close.nano}`
        const percent = ((Number(close) - openprice) / Number(openprice)) * 100

        return {
          value: Number(percent.toFixed(2)),
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
    price: 120,
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
