<template>
  <div class="w-full" ref="chartcontainer" id="chartcontainer">
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
      <LazyChartCDataTimeValue
        title="Доходность открытых позиций"
        :loadData="loadData"
        :width="width"
        :dataHandler="serviceChart.timeprofitHandler"
        units="%"
      />
      <LazyChartCDataTimeValue
        title="Стоимость открытых позиций"
        :loadData="loadData"
        :width="width"
        :dataHandler="serviceChart.timePriceHander"
        units=" ₽"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
/**
 * Страница с графиками
 */
import serviceChart from "~/services/chart/serviceChart"
import loadData from '~/services/chart/mock'

const chartcontainer = ref<HTMLDivElement | null>(null)
const { width } = useChartWidth(chartcontainer)


</script>
