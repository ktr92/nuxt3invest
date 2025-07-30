<template>
  <div class="chart-wrapper w-full" style="position: relative">
    <div class="flex w-full">
      <div class="chartblock w-full">
        <svg
          :id="`chart${uniqueId}`"
          :width="width"
          :height="height"
          class="max-w-full w-full"
        ></svg>
        <div
          class="p-2 absolute rounded-md"
          v-if="tooltip.visible"
          :style="{
            top: tooltip.y + 'px',
            left: tooltip.x + 'px',
            background: 'rgba(0,0,0,0.55)',
            color: 'white',
            pointerEvents: 'none',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            transform: 'translate(-50%, -100%)',
            userSelect: 'none',
            zIndex: 1000,
          }"
        >
          <div v-html="tooltip.text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Компонент для отображения линейной диаграммы
 */
import { debounce } from "lodash-es"
import serviceLineChart from "~/services/chart/serviceLineChart"

const props = defineProps<{
  data: LineData[]
  width: number
  height?: number
  uniqueId: string
  units?: string
}>()
const width = computed(() => (props.width ? props.width : 600))
const height = props.height ?? 300
const margin = 50
const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  text: "",
})

/**
 * функция откладывает перерисовку для снижения нагрузки при рисовании графика {@see services.chart.renderLineChart}
 */
const debouncedRender = debounce(serviceLineChart.renderLineChart, 300)
/**
 * параметры для графика
 */
const chartOptions = computed<LineChartApi>(() => {
  return {
    linedata: props.data,
    tooltip, 
    uniqueId: props.uniqueId,
    width: width.value,
    margin,
    height,
    units: props.units,
  }
})
/**
 * рисуем диаграмму и добавляем перерисовку при ресайзе окна
 */
onMounted(() => {
  serviceLineChart.renderLineChart(chartOptions.value)
})
watch(width, () => {
  debouncedRender(chartOptions.value)
})
</script>

<style scoped>
.chart-wrapper {
  user-select: none;
}
</style>
