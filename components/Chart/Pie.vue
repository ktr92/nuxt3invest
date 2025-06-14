<template>
  <div ref="container" class="chart-wrapper" style="position: relative">
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
</template>

<script setup lang="ts">
import * as d3 from "d3"

interface DataItem {
  category: string
  value: number
}

const props = defineProps<{
  data: DataItem[]
  width?: number
  height?: number
}>()

// параметры контейнера для графика
const width = props.width ?? 500
const height = props.height ?? 500
const margin = 30

// для круговой диаграммы нужен радиус
const radius = Math.min(width / 2 - margin * 2, height / 2  - 2 * margin)

// цвета для диаграммы
const color = d3.scaleOrdinal(d3.schemeSet3)

const chart = ref<SVGSVGElement | null>(null)
const container = ref<HTMLDivElement | null>(null)

// подсказки
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
  // проверяем есть ли в шаблоне нужные элементы для графика
  if (!chart.value || !container.value) return

  // проверяем входные данные для графика
  if (!props.data || !Array.isArray(props.data) || props.data.length === 0) {
    d3.select(chart.value).selectAll("*").remove()
    tooltip.visible = false
    return
  }

  // перед рисования графика очищаем контейнер
  d3.select(chart.value)
    .selectAll("*")
    .remove();

  // ширина и высота графика = размер контейнера - отступы с обеих сторон
  const innerWidth = width - 2 * margin
  const innerHeight = height - 2 * margin


  // создаем генератор секций 
  const pie = d3.pie<DataItem>()
                .sort(null)
                .value((d => d.value));


                
  // создаем графическое представление секций
  const arc = d3.arc<d3.PieArcDatum<DataItem>>()
                .outerRadius(radius)
                .innerRadius(radius - 90);




  // выбор контейнера svg для графика и установка его размеров
  const svg = d3.select(chart.value)
                .attr("width", width)
                .attr("height", height)
                .attr('class', 'axis')
                .append("g")
                .attr("transform", `translate(${width / 2 + margin * 2},${height / 2})`);


  // рисование секторов 
  const g = svg.selectAll('.arc')
                .data(pie(props.data))       
                .enter()
                .append("g")
                .attr('class', 'arc')
                .append('path')
                .attr('d', d => arc(d))
                .style('fill', (d) => color(d.data.category))        
                     


}

onMounted(() => {
  renderChart()
})
</script>

<style scoped>
.bar {
  transition: fill 0.2s ease;
  cursor: pointer;
}

.chart-wrapper {
  user-select: none;
}
</style>
