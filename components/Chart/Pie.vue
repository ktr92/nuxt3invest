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
import { ref, onMounted, watch, nextTick, reactive } from 'vue'

interface DataItem {
  category: string
  value: number
}

const props = defineProps<{
  data: DataItem[]
  width?: number
  height?: number
}>()

const width = props.width ?? 500
const height = props.height ?? 300
const margin = { top: 20, right: 20, bottom: 40, left: 40 }

const chart = ref<SVGSVGElement | null>(null)
const container = ref<HTMLDivElement | null>(null)

const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  text: '',
})

const renderChart = () => {
  if (!chart.value || !container.value) return

  if (!props.data || !Array.isArray(props.data) || props.data.length === 0) {
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


  const piedata = [1, 1, 2, 3, 5, 8, 13, 21];
  const pie = d3.pie().padAngle(0.4);
  const arcs = pie(piedata);
  console.log(arcs)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  const x = d3.scaleBand()
    .domain(props.data.map(d => d.category))
    .range([0, innerWidth])
    .padding(0.1)

  const y = d3.scaleLinear()
    .domain([0, d3.max(props.data, d => d.value) ?? 0])
    .nice()
    .range([innerHeight, 0])

  g.append('g')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x))

  g.append('g')
    .call(d3.axisLeft(y))

  // Bars with mouse events
  g.selectAll('.bar')
    .data(props.data)
    .enter()
    .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.category) ?? 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('fill', '#3b82f6')
      .on('mouseenter', function(event, d) {
        d3.select(this).attr('fill', '#2563eb') // ярче цвет
        tooltip.text = `${d.category}: ${d.value}`
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
      .on('mouseleave', function() {
        d3.select(this).attr('fill', '#3b82f6') // возвращаем обычный цвет
        tooltip.visible = false
      })
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .delay(50)
      .attr('height', d => innerHeight - y(d.value))

}

onMounted(() => {
  nextTick(() => renderChart())
})

watch(() => props.data, () => {
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