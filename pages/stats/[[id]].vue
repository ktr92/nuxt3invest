<template>
  <div class="w-full" ref="chartcontainer" id="chartcontainer">
    <ClientOnly class="w-full">
      <!--   <ChartMainTimePrice :loadData="loadData" :width="width" />
      <ChartMainTimeProfit :loadData="loadData" :width="width" /> -->
      <ChartMainTimeValue
        title="Стоимость портфеля"
        :loadData="loadData"
        :width="width"
        :dataHandler="serviceApiData.timeTotalHandler"
        units=" ₽"
      />
      <ChartMainTimeValue
        title="Доходность открытых позиций"
        :loadData="loadData"
        :width="width"
        :dataHandler="serviceApiData.timeprofitHandler"
        units="%"
      />
      <ChartMainTimeValue
        title="Стоимость открытых позиций"
        :loadData="loadData"
        :width="width"
        :dataHandler="serviceApiData.timePriceHander"
        units=" ₽"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
/**
 * Страница с графиками
 */
import serviceApiData from "~/services/apidata/serviceApiData"
import appcontent from "~/services/apidata/mock"

// достаем данные пользователя
const loadData = appcontent.getPortfolio()[0].positions

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
</script>
