<template>
  <div class="w-full" ref="chartcontainer" id="chartcontainer">
    <ClientOnly class="w-full">
      <!--   <ChartCDataTimePrice :loadData="loadData" :width="width" />
      <ChartCDataTimeProfit :loadData="loadData" :width="width" /> -->
      <ChartCDataTimeValue
        title="Стоимость портфеля"
        :loadData="loadData"
        :width="width"
        :dataHandler="serviceApiData.timeTotalHandler"
        units=" ₽"
      />
      <LazyChartCDataTimeValue
        title="Доходность открытых позиций"
        :loadData="loadData"
        :width="width"
        :dataHandler="serviceApiData.timeprofitHandler"
        units="%"
      />
      <LazyChartCDataTimeValue
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
import loadData from '~/services/apidata/mock'

const chartcontainer = ref<HTMLDivElement | null>(null)
const { width } = useChartWidth(chartcontainer)


</script>
