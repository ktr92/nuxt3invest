<template>
  <div class="w-full" ref="chartcontainer" id="chartcontainer">
    <ClientOnly class="w-full">
      <!--   <ChartMainTimePrice :loadData="loadData" :width="width" />
      <ChartMainTimeProfit :loadData="loadData" :width="width" /> -->

      <ChartTypePie :data="chartData" />
      <ChartTypeBar :data="chartData" />
      <ChartMainTimeValue
        title="Profitability of open positions"
        :loadData="positions"
        :width="width"
        :dataHandler="serviceApiData.timeprofitHandler"
        units="%"
      />
      <ChartMainTimeValue
        title="The cost of open positions"
        :loadData="positions"
        :width="width"
        :dataHandler="serviceApiData.timePriceHander"
        units=" ₽"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
/**
 * Блок с графиками
 */
import serviceApiData from "~/services/apidata/serviceApiData"

// достаем данные пользователя
const { positions } = useGetPositions()
/* // сохраняем состояние в хранилище
const contentStore = useContentStore()
contentStore.setUserContent(loadData)
const currentPortfolio = contentStore.getUserPortfolio('1').positions
// определяем какие данные использовать для графиков
contentStore.setChartData(currentPortfolio)
 */
// определяем параметры графика
const chartcontainer = ref<HTMLDivElement | null>(null)
const { width } = useChartWidth(chartcontainer)


const loadData = [
  {
    ticker: "HYDR",
    name: "Русгидро",
    count: 6000000,
    price: 0.5,
    newprice: 0.6,
    pricechange: 0.1,
    total: 500,
    change: 11,
    yearchange: 12,
    openDate: "02.01.2024",
    share: 20
  },
  {
    ticker: "ROSN",
    name: "Роснефть",
    count: 12323,
    price: 420,
    newprice: 380,
    pricechange: -40,
    total: 500,
    change: -6,
    yearchange: 11,
    openDate: "02.03.2024",
    share: 30
  },
  {
    ticker: "LKOH",
    name: "Лукойл",
    count: 444,
    price: 6500,
    newprice: 6700,
    pricechange: 200,
    total: 500,
    change: 22,
    yearchange: 32,
    openDate: "22.11.2024",
    share: 25
  },
  {
    ticker: "ASTR",
    name: "Астра",
    count: 33213,
    price: 545,
    newprice: 567,
    pricechange: 22,
    total: 500,
    change: 10,
    yearchange: -20,
    openDate: "23.01.2025",
    share: 25
  },
]

const chartData = computed(() => {
  return loadData.map(item => {
    return {
      category: item.name,
      value: item.count * item.newprice,
      ticker: item.ticker,
      startvalue: item.count * item.price,
      pricechange: item.count * item.newprice - item.count * item.price,
      change: item.change,
      share: item.share
    }
  })
  
})
</script>
