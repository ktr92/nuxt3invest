<template>
  <div class="w-full">
    <TableMain :tableheader="tableHeader" :tabledata="loadData" />
    <div v-if="loadData && loadData.length" class="w-full" ref="chartcontainer">
    <ChartCDataTimeValue
        title="Стоимость портфеля"
        :loadData="loadData"
        :width="width" 
        :dataHandler="serviceChart.timeTotalHandler"
        units=" ₽"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import serviceChart  from '~/services/chart/serviceChart'
import loadData from '~/services/chart/mock'
const chartcontainer = ref<HTMLElement | null>(null)
const { width } = useChartWidth(chartcontainer)

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
