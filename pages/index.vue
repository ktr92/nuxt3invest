<template>
  <div class="w-full" ref="chartcontainer">
    <ClientOnly class="w-full">
      <!--   <ChartCDataTimePrice :loadData="loadData" :width="width" />
      <ChartCDataTimeProfit :loadData="loadData" :width="width" /> -->
      <ChartCDataTimeValue
        title="Стоимость портфеля"
        :loadData="loadData"
        :width="width"
        :dataHandler="serviceChart.timeTotalHandler"
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
import serviceChart from "~/services/chart"
import loadData from '~/services/chart/mock'

const chartcontainer = ref<HTMLDivElement | null>(null)
const width = computed(() =>
  chartcontainer.value ? chartcontainer.value.clientWidth : 600
)


// const getFirstDate = serviceChart.getFirstDate(loadData)

 

const timePriceHander = (
  candles: any,
  from: Date,
  shares: APISharesResponse,
  instrumentId: Array<{ id: string }>,
  alltime: boolean
) => {
  return candles.map((res: any, index: number) => {
    const ticker = serviceChart.getTicker(shares, instrumentId, index)
    const count = loadData.filter((item) => item.ticker === ticker)[0].count
    let opendate = new Date(serviceChart.getOpenDate(alltime, from, ticker, loadData))

    return {
      dates: res.map((item: any) => {
        const close = serviceChart.formatPrice(item.close)
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
    const ticker = serviceChart.getTicker(shares, instrumentId, index)
    // цена покупки
    let openprice = loadData.filter((item) => item.ticker === ticker)[0].price
    // дата покупки
    let opendate = serviceChart.getOpenDate(alltime, from, ticker, loadData)

    // для изменения периода менять отсчет
    if (new Date(opendate) < from) {
      const tmp: Date = new Date(from.setDate(from.getDate() - 1))
      opendate = tmp.toISOString()
      openprice = Number(serviceChart.formatPrice(candles[index][0].open))
    }

    return {
      id: ticker, // figi
      dates: res.map((item: any) => {
        const close = serviceChart.formatPrice(item.close)
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



/* 
console.log("chartData :", chartData.value) */
</script>
