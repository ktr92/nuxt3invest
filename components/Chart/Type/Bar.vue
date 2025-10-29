<template>
  <div ref="container" class="chart-wrapper" style="position: relative;">
    <svg ref="chart" :width="width" :height="height"></svg>
    <div v-if="tooltip.visible" 
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
         }">
      {{ tooltip.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import { makeChartLineAxis, styleAxis } from '~/services/chart/line/axis';
import generateColors from "~/utils/colorGenerate"

const props = defineProps<{
  loadData: IPortfolioData[]
  width?: number
  height?: number
}>()



const width = props.width ?? 500
const height = props.height ?? 300
const margin = { top: 20, right: 20, bottom: 40, left: 70 }

const chart = ref<SVGSVGElement | null>(null)
const container = ref<HTMLDivElement | null>(null)

const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  text: '',
})
const colorSet = generateColors(props.loadData.length)
const colorHover = ["rgb(59, 130, 246)"]
const color = d3.scaleOrdinal(colorSet)

const renderChart = () => {
  if (!chart.value || !container.value) return

  if (!props.loadData || !Array.isArray(props.loadData) || props.loadData.length === 0) {
    d3.select(chart.value).selectAll('*').remove()
    tooltip.visible = false
    return
  }

  d3.select(chart.value).selectAll('*').remove()

  const svg = d3.select(chart.value)
    .attr('width', width)
    .attr('height', height)

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)


  const x = d3.scaleBand()
    .domain(props.loadData.map(d => d.name))
    .range([0, innerWidth])
    .padding(0.1)

  const y = d3.scaleLinear()
    .domain([0, d3.max(props.loadData, d => d.newprice) ?? 0])
    .nice()
    .range([innerHeight, 0])



  const gxAxis = g.append('g')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x))

  const gyAxis = g.append('g')
    .call(d3.axisLeft(y).ticks(10)
      .tickFormat(d => d === null ? '' : numberFormat(Math.round(Number(d)), 0).toString()))

  styleAxis(gxAxis, gyAxis)


// Функция для построения path с закруглёнными верхними углами
function roundedTopRect(x: number, y: number, width: number, height: number, radius: number) {
  if (height < 0) height = 0; // предосторожность
  if (height < radius) radius = height; // если высота очень маленькая — уменьшаем радиус

  return `
    M${x},${y + height} 
    L${x},${y + radius}
    Q${x},${y} ${x + radius},${y} 
    L${x + width - radius},${y}
    Q${x + width},${y} ${x + width},${y + radius}
    L${x + width},${y + height}
    Z
  `;
}

// Начальная высота и y для анимации (0-высота, y = innerHeight)
g.selectAll('.bar')
  .data(props.loadData)
  .enter()
  .append('path')
    .attr('class', 'bar')
    .attr('fill', d => color(d.name))
    .attr('d', d => roundedTopRect(
      x(d.name) ?? 0,
      innerHeight,
      x.bandwidth(),
      0,
      10
    ))
    .on('mouseenter', function(event, d) {
      d3.select(this).attr('fill', 'rgb(59, 130, 246)')
      tooltip.text = `${d.name}: ${d.newprice}`
      tooltip.visible = true
      const [mouseX, mouseY] = d3.pointer(event, container.value)
      tooltip.x = mouseX
      tooltip.y = mouseY
    })
    .on('mousemove', function(event) {
      const [mouseX, mouseY] = d3.pointer(event, container.value)
      tooltip.x = mouseX
      tooltip.y = mouseY
    })
    .on('mouseleave', function(event, d) {
      d3.select(this).attr('fill', color(d.name))
      tooltip.visible = false
    })
    // Анимация
    .transition()
    .ease(d3.easeLinear)
    .duration(300)
    .attrTween('d', function(d) {
      const ix = d3.interpolateNumber(0, innerHeight - y(d.newprice as number));
      return function(t) {
        const height = ix(t);
        return roundedTopRect(
          x(d.name) ?? 0,
          innerHeight - height,
          x.bandwidth(),
          height,
          12
        );
      };
    });

}

onMounted(() => {
  nextTick(() => renderChart())
})

watch(() => props.loadData, () => {
  nextTick(() => renderChart())
}, { deep: true, immediate: true })
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