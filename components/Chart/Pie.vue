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
      <TableChart :data="data" @hover-d3="hoverD3" @leave-d3="leaveD3" :color-set="colorSet"/>    
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Компонент для вывода круговой диаграммы
 */
import * as d3 from "d3"

/** Интерфейс данных которые будут выводиться в диаграмме */
interface DataItem  {
  category: string
  value: number
  startvalue?: number
  ticker?: string
  change?: number
  pricechange?: number
  share?: number
}

const props = defineProps<{
  data: DataItem[]
  width?: number
  height?: number
}>()


/** параметры контейнера для графика */ 
const width = props.width ?? 600
const height = props.height ?? 600
const margin = 30

/** для круговой диаграммы нужен радиус */
const radius = Math.min(width / 2 - margin * 2, height / 2  - 2 * margin)

/** массив цветов для секторов диаграммы */
const colorSet = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
/** цвет сектора для ховера */
const colorHover = ['rgb(59, 130, 246)']
/** шкала для привязки цветов к данным */
const color = d3.scaleOrdinal(colorSet)

const pieAngle = 0.03
const innerRad = 120

const chart = ref<SVGSVGElement | null>(null)
const container = ref<HTMLDivElement | null>(null)
const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  text: "",
})

/** Тип смены цвета - соотвественно смена на другой цвет или возврат к родному цвету */
type colorType = 'hover' | 'unhover'

/**
 * Событие при ховере на элемент таблицы с данными.
 * @param {string} category - категория под ховером
 * @param {string} prevColor - соотвествующий для данной категории цвет
 */
const hoverD3 = (category: string, prevColor: string, value: number) => { 
  // выбираем из диаграммы  сектор, соотвествующий категории под ховером
  const $el = d3.select(`path[data-id="${category}"]`);
  // меняем цвет выбранного сектора  
  changePieColor($el, 'hover')
  /** @see changeItemColor */
  changeItemColor(category, 'hover', prevColor)
  // определяем текст, который будет выводиться в подсказке - название категории и ее значение
  const tooltiptext = category + ": " + numberFormat(value.toFixed(2)) + " ₽"
  // показываем подсказку на секторе диаграмме для соотвествующей категории под ховером
  showTooltip(category, tooltiptext)
}
/**
 * Событие при снятия ховера с элемента таблицы с данными.
 * @param {string} category - категория которая была под ховером
 * @param {string} prevColor - соотвествующий для данной категории цвет
 */
const leaveD3 = (category: string, prevColor: string) => {
  const $el = d3.select(`path[data-id="${category}"]`);
  // возвращаем цвет выбранного сектора 
  changePieColor($el, 'unhover')
  // возвращаем цвет элемента в таблице под ховером
  changeItemColor(category, 'unhover', prevColor)
  // скрываем подсказку 
  hideTooltip()
}

/**
 * Смена цвета элемента в таблице под ховером 
 * @param category - выбранная категория
 * @param colorAttr - тип смены цвета 
 * @param prevColor - соотвествующий для данной категории цвет 
 */
const changeItemColor = (category: string, colorAttr: colorType, prevColor?: string) => {
  d3.select(`[data-category=${category}] [data-color]`)
    .attr('style', `background-color: ${colorAttr === 'hover' ? colorHover : prevColor}`)
}

/**
 * Смена цвета сектора диаграммы. Вызывается при ховере.
 * @param $el - элемент диаграммы, для которого меняется цвет
 * @param colorAttr - тип смены цвета
 * @param d - Секция с данными 
 */
const changePieColor = ($el: d3.Selection<d3.BaseType, unknown, HTMLElement, any> | d3.Selection<SVGPathElement, unknown, null, undefined>, colorAttr: colorType, d?: d3.PieArcDatum<DataItem>) => {
  // извлекаем текущий цвет
  const targetAttr = colorAttr === 'hover' ? 'fill' : 'exfill'
  const prevColor = $el.attr(targetAttr);
    if (prevColor) {
      // для таблицы - если hover - то применяем новый цвет для fill, а если unhover - возвращаем старый цвет 
      $el.attr(targetAttr, colorHover) 
      $el.attr('style', `transform: ${colorAttr === 'hover' ? 'scale(1.05)' : ''};  transition: all 0.3s ease;`)
      $el.attr(colorAttr === 'hover' ? 'exfill' : 'fill', prevColor)
      
      // для секций - если hover - то применяем новый цвет, а если unhover - возвращаем старый цвет
      if (d) {
        changeItemColor(d.data.category, colorAttr, prevColor)
        const tooltipText = `${d.data.category}: ${numberFormat(d.value.toFixed(2)) } ₽`
        showTooltip(d.data.category, tooltipText)
      }
    
    }
}

/**
 * Вывод подсказки при ховере
 * @param category - категория для идентификации 
 * @param tooltipText - текст подсказки
 */
const showTooltip = (category: string, tooltipText: string) => {
      tooltip.text = tooltipText
      tooltip.visible = true
     /*  const [mouseX, mouseY] = d3.pointer(event, container.value) */
      tooltip.x = Number(d3.select(`path[data-id="${category}"]`).attr('data-centerX'))
      tooltip.y = Number(d3.select(`path[data-id="${category}"]`).attr('data-centerY'))
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
  d3.select(chart.value)
    .selectAll("*")
    .remove();

  // ширина и высота графика = размер контейнера - отступы с обеих сторон
  const innerWidth = width - 2 * margin
  const innerHeight = height - 2 * margin

  // создаем генератор секций 
  const pie = d3.pie<DataItem>()
                .sort(null)
                .padAngle(pieAngle) // промежутки сежду секторами
                .value((d => d.value));
                
  // создаем графическое представление секций
  const arc = d3.arc<d3.PieArcDatum<DataItem>>()
                .outerRadius(radius)
                .innerRadius(radius - innerRad);

  // выбор контейнера svg для графика и установка его размеров
  const svg = d3.select(chart.value)
                .attr("width", width)
                .attr("height", height)
                .attr("padding", margin)
                .attr('class', 'axis')
                .append("g")
                .attr("transform", `translate(${width / 2 },${height / 2})`);

                console.log(pie(props.data))
  // рисование секторов 
  const g = svg.selectAll('.arc')
                .data(pie(props.data))       
                .enter()
                .append("g")
                .attr('class', 'arc')
                .append('path')
                .attr('d', d => arc(d))
                .attr('data-id', (d) => d.data.category)    
                .attr('data-centerX', (d) => arc.centroid(d)[0] + width / 2)    
                .attr('data-centerY', (d) => arc.centroid(d)[1] + height / 2)    
                .attr('fill', (d) => color(d.data.category))    
                .on('mouseover', function(e, d) {
                
                  const $el = d3.select(this)
                 /*  markPie($el, d) */
                  changePieColor($el, 'hover', d)
                })
                .on('mouseleave', function(e, d) {
                  const $el = d3.select(this)
                  changePieColor($el, 'unhover', d)
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
