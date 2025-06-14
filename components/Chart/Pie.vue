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

const getMin = (arr: Array<DataItem>) => {
  let min = 0
  arr.forEach(item => {
    if ((item.value) < min) {
      min = item.value
    }
  });

  return min
}
const getMax = (arr: Array<DataItem>) => {
  let max = 0
  arr.forEach(item => {
    if ((item.value) > max) {
      max = item.value
    }
  });

  return max
}

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

// цвета для диаграммы - между границ значений создаем шкалу цветов в пределах выбранных границ цветов
const color = d3.scaleOrdinal(d3.schemePastel1)



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
                .padAngle(0.03) // промежутки сежду секторами
                .value((d => d.value));


                
  // создаем графическое представление секций
  const arc = d3.arc<d3.PieArcDatum<DataItem>>()
                .outerRadius(radius)
                .innerRadius(radius - 90);




  // выбор контейнера svg для графика и установка его размеров
  const svg = d3.select(chart.value)
                .attr("width", width)
                .attr("height", height)
                .attr("padding", margin)
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
                .attr('fill', (d) => color(d.data.category))    
                .on('mouseover', function(e, d) {
                  const $el = d3.select(this)
                  const currentColor = $el.attr('fill');
                  if (currentColor && d3.color(currentColor)) {
                    $el.attr('fill', 'red')
                    $el.attr('style', 'transform: scale(1.05);  transition: all 0.3s ease;')
                    $el.attr('exfill', currentColor)
                  }
                })
                .on('mouseleave', function(e, d) {
                  const $el = d3.select(this)
                  const exColor = $el.attr('exfill');
                  if (exColor && d3.color(exColor)) {
                    $el.attr('fill', exColor)
                    $el.attr('style', 'transform: scale(1);  transition: all 0.3s ease;')
                  }
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
