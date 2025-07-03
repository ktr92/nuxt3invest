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
 * Компонент для вывода линейной диаграммы
 */
import * as d3 from "d3"
import generateColors from "~/utils/colorGenerate"
import { debounce } from "lodash-es"

const props = defineProps<{
  data: LineData[]
  width: number
  height?: number
  uniqueId: string
}>()

/* const chart = ref<SVGSVGElement | null>(null) */

/** параметры контейнера для графика */
/* const width = props.width ?? container.value.clientWidth
 */ const height = props.height ?? 300
const margin = 50

/** массив цветов для линий */
/* const colorSet = ["steelblue", "red", "green"] */
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

/**
 * Функция для рисования графика
 */
const renderChart = () => {
  const localeRU = d3.timeFormatLocale(useChartLocale())

  const width = computed(() =>
    props.width ?   props.width : 600
  )

  /*   const datevalue = props.data[0].dates
   */
  // проверяем входные данные для графика
  if (!props.data || !Array.isArray(props.data) || props.data.length === 0) {
    d3.select('').selectAll("*").remove()
    useHideTooltip(tooltip)
    return
  }

  // перед рисованием графика очищаем контейнер
  d3.select(`#chart${props.uniqueId}`).selectAll("*").remove()

  const flatData = props.data.flatMap((item) => item.dates)

  const minCategory = d3.min(flatData, (d) => new Date(d.date))
  const maxCategory = d3.max(flatData, (d) => new Date(d.date))
  const minValue = d3.min(flatData, (d) => d.value)
  const maxValue = d3.max(flatData, (d) => d.value)

  // даты нужно интерполировать на ось Х
  const x = d3.scaleTime(
    [minCategory || new Date(), maxCategory || new Date()],
    [0, width.value - 2 * margin]
  )

  const y = d3
    .scaleLinear()
    .domain([minValue || 0, maxValue || 100])
    .range([height - 2 * margin, 0])

const formatDate = useFormatLocale(localeRU)

  const xAxis = d3
    .axisBottom(x)
    .tickFormat(formatDate)
    
  const yAxis = d3.axisLeft(y)

  // генератор линий на основе дат
  const line = d3
    .line<DatePrice>()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.value))
    .curve(d3.curveCatmullRom.alpha(0.5))

  // выбор контейнера svg для графика и установка его размеров
  const svg = d3
    .select(`#chart${props.uniqueId}`)
    .attr("width", width.value)
    .attr("height", height)
    .attr("padding", margin)
    .append("g")
    .attr("transform", `translate(0, 0)`)

  /** рисование осей координат */
  useChartLineAxis(svg, xAxis, yAxis, width.value, height, margin, props.uniqueId)

  /** рисование вертикальных линий  - показ при ховере */
  useVLine(
    svg,
    flatData,
    x,
    y,
    width.value,
    height,
    margin,
    tooltip,
    props.data, props.uniqueId
  )

  props.data.forEach((item, index) => {
    /*  renderChart(item) */
    const datesFrom: DatePrice[] = []
    // если график от даты открытия позиции
    if (item.opendate) {
      item.dates.forEach((dates) => {
        if (item.opendate && dates.date >= item.opendate) {
          datesFrom.push(dates)
        }
      })
      item.dates = datesFrom
    }

    renderLine(item, svg, line, x, y, width.value, colorSet[index], props.uniqueId)
  })
}

/**
 * Функция для рисования каждой линии из входного массива
 */
const renderLine = (
  position: LineData,
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  line: d3.Line<DatePrice>,
  x: d3.ScaleTime<number, number, never>,
  y: d3.ScaleLinear<number, number, never>,
  width: number,
  color: string,
  uniqueId: string
) => {
  const datevalue = position.dates

  // рисование линии
  const g = svg
    .append("path")
    .attr("d", line(datevalue))
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 2)

  useLineAnimation(g, props.uniqueId)

  /** рисование точек для значений на линии графика - при ховере */
  useChartDot(
    position.id,
    svg,
    datevalue,
    x,
    y,
    width,
    height,
    margin,
    tooltip,
    color, props.uniqueId
  )
}

/**
 * функция откладывает перерисовку для снижения нагрузки
 */
const debouncedRender = debounce(renderChart, 300)

/**
 * рисуем диаграмму и добавляем перерисовку при ресайзе окна
 */
onMounted(() => {
  renderChart()
  window.addEventListener("resize", debouncedRender)
})

onUnmounted(() => {
  window.removeEventListener("resize", debouncedRender)
})
</script>

<style scoped>
.chart-wrapper {
  user-select: none;
}
</style>
