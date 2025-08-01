<template>
  <div class="w-full">
    <TableMain :tableheader="tableHeader" :tabledata="portfolio" />
    <div v-if="portfolio && portfolio.length" class="w-full" ref="chartcontainer">
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

import appcontent  from '~/services/apidata/mock'
import serviceApiData  from '~/services/apidata/serviceApiData'
const chartcontainer = ref<HTMLElement | null>(null)
const { width } = useChartWidth(chartcontainer)
const portfolio = appcontent.getPortfolio()[0].positions
const tableHeader = [
  "Актив",
  "Количество",
  "Средняя цена",
  "Вложено",
  "Стоимость",
  "Прибыль",
  "Доходность",
]

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
  z-index: -999;
}

/* неактивное состояние */
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* активное состояние */
.slide-enter-to,
.slide-leave-from {
  left: 0;
  opacity: 1;
}
</style>
