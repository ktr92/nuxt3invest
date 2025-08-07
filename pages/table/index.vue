<template>
  <div class="w-full">
    <div v-for="item in portfolio">
      {{ item.name }}
      <TableMain
        :tableheader="appcontent.table.tableHeader"
        :tabledata="item.positions"
      />
      <div
        v-if="item && item.positions.length"
        class="w-full"
        ref="chartcontainer"
      >
        <ChartMainTimeValue
          title="Стоимость портфеля"
          :loadData="item.positions"
          :width="width"
          :dataHandler="serviceApiData.timeTotalHandler"
          units=" ₽"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import appcontent from "~/services/apidata/mock"
import serviceApiData from "~/services/apidata/serviceApiData"

const chartcontainer = ref<HTMLElement | null>(null)
const { width } = useChartWidth(chartcontainer)

const portfolio = appcontent.getPortfolio()
console.log(portfolio) 

</script>
