<template>
  <div ref="container" class="chart-wrapper w-full" style="position: relative">
    <div class="flex w-full">
      <div class="chartblock">
        <svg ref="chart" :width="width" :height="height"></svg>
        <div
          v-if="tooltip.visible"
          :style="{
            position: 'absolute',
            top: tooltip.y + 'px',
            left: tooltip.x + 'px',
            padding: '6px 8px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            borderRadius: '4px',
            pointerEvents: 'none',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            transform: 'translate(-50%, -100%)',
            userSelect: 'none',
            zIndex: 1000,
          }"
        >
          {{ tooltip.text }}
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

/** Интерфейс данных которые будут выводиться в диаграмме */
interface DataItem {
  category: string
  value: number
}

const props = defineProps<{
  data: DataItem[]
  width?: number
  height?: number
}>()

/** параметры контейнера для графика */
const width = props.width ?? 600
const height = props.height ?? 300
const margin = 30

/** массив цветов для линий */
const colorSet = generateColors(100)

/** цвет сектора для ховера */
const colorHover = ["rgb(59, 130, 246)"]
/** шкала для привязки цветов к данным */
const color = d3.scaleOrdinal(colorSet)

const chart = ref<SVGSVGElement | null>(null)
const container = ref<HTMLDivElement | null>(null)
const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  text: "",
})

/**
 * Вывод подсказки при ховере
 * @param category - категория для идентификации
 * @param tooltipText - текст подсказки
 */
const showTooltip = (
  category: string,
  tooltipText: string,
  coord: number[]
) => {
  tooltip.text = tooltipText
  tooltip.visible = true
  /*  const [mouseX, mouseY] = d3.pointer(event, container.value) */
  tooltip.x = coord[0]
  tooltip.y = coord[1]
}

const hideTooltip = () => {
  tooltip.visible = false
}

/**
 * Функция для рисования графика
 */
const renderChart = () => {
  // проверяем есть ли в шаблоне нужные элементы для графика
  if (!chart.value || !container.value) return

  // проверяем входные данные для графика
  if (!props.data || !Array.isArray(props.data) || props.data.length === 0) {
    d3.select(chart.value).selectAll("*").remove()
    hideTooltip()
    return
  }

  // перед рисования графика очищаем контейнер
  d3.select(chart.value).selectAll("*").remove()

  // даты нужно интерполировать на ось Х
  const x = d3.scaleTime(
    [
      new Date(props.data[0].category),
      new Date(props.data[props.data.length - 1].category),
    ],
    [0, width]
  )

  // генератор линий на основе дат
  const line = d3
    .line<DataItem>()
    .x((d) => x(new Date(d.category)))
    .y((d) => d.value)

  // выбор контейнера svg для графика и установка его размеров
  const svg = d3
    .select(chart.value)
    .attr("width", width)
    .attr("height", height)
    .attr("padding", margin)
    .append("g")
    .attr("transform", `translate(0, ${height / 2})`)

  // рисование линии
  const g = svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", colorHover)
    .attr("d", line(props.data))
  /* .on("mouseover", function (e, d) {
      const $el = d3.select(this)
      changePieColor($el, props.data)
    })
    .on("mouseleave", function (e, d) {
      const $el = d3.select(this)
      changePieColor($el, d)
      hideTooltip()
    }) */

  /*  svg.selectAll(".dot")
    .data(props.data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('r', 3)
    .attr('cx', d => x(new Date(d.category)))
    .attr('cy', d => d.value)
    .attr('fill', 'red')
    .attr('data-value', d => d.value)
    .attr('data-id', d => d.category)
    .on("mouseover", function (e, d) {
     showTooltip(d.category, String(d.value), [x(new Date(d.category)), height / 2 + d.value - 15])
    })
    .on("mouseleave", function (e, d) {
      hideTooltip()
    }) */

  svg.selectAll(".vline")
    .data(props.data)
    .enter()
    .append("line")
    .classed("grid-line", true)
    .attr("class", "vline")
    .attr("x1", d => x(new Date(d.category)))
    .attr("y1", 0)
    .attr("x2", d => x(new Date(d.category)))
    .attr("y2", height)
    .attr("stroke", 'gray')
    .attr("stroke-width", 1)
    .attr("data-value", (d) => d.value)
    .attr("data-id", (d) => d.category)
     .attr("transform", `translate(0, -${height / 2})`)
    .on("mouseover", function (e, d) {
      showTooltip(d.category, String(d.value), [
        x(new Date(d.category)),
        height / 2 + d.value - 15,
      ])
    })
    .on("mouseleave", function (e, d) {
      hideTooltip()
    })
}

onMounted(() => {
  renderChart()
})
</script>

<style scoped>
.chart-wrapper {
  user-select: none;
}
</style>
