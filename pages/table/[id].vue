<template>
  <div class="w-full">

      <TableMain
        :tableheader="appcontent.table.tableHeader"
        :tabledata="portfolio"
      />
      <div
        v-if="portfolio && portfolio.length"
        class="w-full"
        ref="chartcontainer"
      >
        <ChartMainTimeValue
          title="Стоимость портфеля"
          :loadData="portfolio"
          :width="width"
          :dataHandler="serviceApiData.timeTotalHandler"
          units=" ₽"
        />
      </div>

  </div>
</template>

<script setup lang="ts">
import appcontent from "~/services/apidata/mock"
import serviceApiData from "~/services/apidata/serviceApiData"

const chartcontainer = ref<HTMLElement | null>(null)
const { width } = useChartWidth(chartcontainer)

const { portfolio } = useGetPortfolio()

</script>
