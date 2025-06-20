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

  const minCategory = d3.min(props.data, (d) => new Date(d.category))
  const maxCategory = d3.max(props.data, (d) => new Date(d.category))
  const minValue = d3.min(props.data, (d) => d.value)
  const maxValue = d3.max(props.data, (d) => d.value)

  // даты нужно интерполировать на ось Х
  const x = d3.scaleTime(
    [minCategory || new Date(), maxCategory || new Date()],
    /*      d3.extent(props.data, d => new Date(d.category)),
     */ [0, width - 2 * margin]
  )

  const y = d3
    .scaleLinear()
    .domain([minValue || 0, maxValue || 100])
    .range([height - 2 * margin, 0])

  const xAxis = d3.axisBottom(x)
  const yAxis = d3.axisLeft(y)

  // генератор линий на основе дат
  const line = d3
    .line<DataItem>()
    .x((d) => x(new Date(d.category)))
    .y((d) => y(d.value))

  // выбор контейнера svg для графика и установка его размеров
  const svg = d3
    .select(chart.value)
    .attr("width", width)
    .attr("height", height)
    .attr("padding", margin)
    .append("g")
    .attr("transform", `translate(0, 0)`)

  // рисование линии
  const g = svg
    .append("path")
    .attr('transform', `translate(${margin}, ${margin})`)
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

  /* svg
    .selectAll(".hline")
    .data(props.data)
    .enter()
    .append("line")
    .classed("grid-line", true)
    .attr("class", "hline")
    .attr("x1", 0)
    .attr("y1", (d) => y(d.value))
    .attr("x2", width - 2 * margin)
    .attr("y2", (d) => y(d.value))
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .attr("transform", `translate(${margin}, ${margin})`) 
  .attr('opacity', 0)
    .on("mouseover", function (e, d) {
      d3.select(this)
        .attr('opacity', 1)
    })
     .on("mouseleave", function (e, d) {
       d3.select(this)
        .attr('opacity', 0)
    }) */

  svg
    .selectAll(".vline")
    .data(props.data)
    .enter()
    .append("line")
    .classed("grid-line", true)
    .attr("class", "vline")
    .attr("x1", (d) => x(new Date(d.category)))
    .attr("y1", 0)
    .attr("x2", (d) => x(new Date(d.category)))
    .attr("y2", height - 2 * margin)
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .attr("data-value", (d) => d.value)
    .attr("data-id", (d) => d.category)
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("opacity", 0)
    .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1)

      showTooltip(d.category, String(d.value), [
        x(new Date(d.category)),
        height / 2 + d.value - 15,
      ])
    })
    .on("mouseleave", function (e, d) {
      d3.select(this).attr("opacity", 0)

      hideTooltip()
    })

  svg
    .append("g")
    .attr('transform', `translate(${margin}, ${height - margin})`)
    .call(xAxis)
  svg
    .append("g")
    .attr('transform', `translate(${margin}, ${margin})`)
    .call(yAxis)
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
