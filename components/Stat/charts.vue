<template>
  <div class="w-full" ref="chartcontainer" id="chartcontainer">
    <ClientOnly class="w-full">
      <!--   <ChartMainTimePrice :loadData="loadData" :width="width" />
      <ChartMainTimeProfit :loadData="loadData" :width="width" /> -->

      <div class="">
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
      </div>
      <!-- /.flex -->
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
const chartcontainer = ref<HTMLDivElement | null>(null)
const { width } = useChartWidth(chartcontainer)
</script>
