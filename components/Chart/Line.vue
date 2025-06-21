<template>
  <div ref="container" class="chart-wrapper w-full" style="position: relative">
    <div class="flex w-full">
      <div class="chartblock w-full">
        <svg ref="chart" :width="width" :height="height"></svg>
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
        <div v-html="tooltip.text">
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Компонент для вывода круговой диаграммы
 */
import * as d3 from "d3"
import generateColors from "~/utils/colorGenerate"

const props = defineProps<{
  data: LineData[]
  width?: number
  height?: number
}>()

const chart = ref<SVGSVGElement | null>(null)
const container = ref<HTMLDivElement | null>(null)

/** параметры контейнера для графика */
/* const width = props.width ?? container.value.clientWidth
 */const height = props.height ?? 300
const margin = 30

/** массив цветов для линий */
const colorSet = generateColors(100)

/** цвет сектора для ховера */
const colorHover = ["rgb(59, 130, 246)"]
/** шкала для привязки цветов к данным */
const color = d3.scaleOrdinal(colorSet)


const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  text: "",
})

const width = computed(() => container.value ? container.value.clientWidth : 600)

/**
 * Функция для рисования графика
 */
const renderChart = (position: LineData) => {
  const datevalue = position.dates

  // проверяем есть ли в шаблоне нужные элементы для графика
  if (!chart.value || !container.value) return

  // проверяем входные данные для графика
  if (!props.data || !Array.isArray(props.data) || props.data.length === 0) {
    d3.select(chart.value).selectAll("*").remove()
    useHideTooltip(tooltip)
    return
  }

  // перед рисованием графика очищаем контейнер
  d3.select(chart.value).selectAll("*").remove()

  const minCategory = d3.min(datevalue, (d) => new Date(d.date))
  const maxCategory = d3.max(datevalue, (d) => new Date(d.date))
  const minValue = d3.min(datevalue, (d) => d.price)
  const maxValue = d3.max(datevalue, (d) => d.price)

  // даты нужно интерполировать на ось Х
  const x = d3.scaleTime([minCategory || new Date(), maxCategory || new Date()],[0, width.value - 2 * margin])
   

  const y = d3.scaleLinear()
    .domain([minValue || 0, maxValue || 100])
    .range([height - 2 * margin, 0])

  const xAxis = d3.axisBottom(x).ticks(d3.timeMonth.every(1), '%b %y')
  const yAxis = d3.axisLeft(y)

  // генератор линий на основе дат
  const line = d3
    .line<DatePrice>()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.price))

  // выбор контейнера svg для графика и установка его размеров
  const svg = d3
    .select(chart.value)
    .attr("width", width.value)
    .attr("height", height)
    .attr("padding", margin)
    .append("g")
    .attr("transform", `translate(0, 0)`)

  // рисование линии
  const g = svg
    .append("path")
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("fill", "none")
    .attr("stroke", colorHover)
    .attr("stroke-width", 2)
    .attr("d", line(datevalue))

  /** рисование вертикальный линий  - при ховере */
  useVLine(svg, datevalue, x, y, width.value, height, margin, tooltip)
  /** рисование точек для значений на линии графика - при ховере */
  useChartDot(svg, datevalue, x, y, width.value, height, margin, tooltip)
  /** рисование осей координат */
  useChartLineAxis(svg, xAxis, yAxis, width.value, height, margin)
}


onMounted(() => {
  props.data.forEach((item) => {
    renderChart(item)
  })
})
</script>

<style scoped>
.chart-wrapper {
  user-select: none;
}
</style>
