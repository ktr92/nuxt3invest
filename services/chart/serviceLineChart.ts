/**
 * Модуль для построения графиков
 */
import * as d3 from "d3"
import generateColors from "~/utils/colorGenerate"
//import { makeFormatLocale, makeChartLocale } from "./line/chartlocale"
import { makeChartLineAxis } from "./line/axis"
import { makeLineAnimation } from "./line/animation"
import { makeChartDot } from "./line/dot"
import { makeVLine } from "./line/grid"
import { hideTooltip } from "./line/tooltip"

/** массив цветов для линий */
const colorSet = generateColors(100)

const serviceLineChart = {
  /**
   * функция для рисования линейного графика
   * @param {LineChartApi} params - данные для графика
   */
  renderLineChart(params: LineChartApi): void {
    //const localeRU = d3.timeFormatLocale(makeChartLocale())

    // проверяем входные данные для графика
    if (
      !params.linedata ||
      !Array.isArray(params.linedata) ||
      params.linedata.length === 0
    ) {
      d3.select("").selectAll("*").remove()
      hideTooltip(params.tooltip)
      return
    }

    // перед рисованием графика очищаем контейнер
    d3.select(`#chart${params.uniqueId}`).selectAll("*").remove()

    const flatData = params.linedata.flatMap((item) => item.dates)

    const minDate = d3.min(flatData, (d) => new Date(d.date))
    const maxDate = d3.max(flatData, (d) => new Date(d.date))
    const minValue = d3.min(flatData, (d) => d.value)
    const maxValue = d3.max(flatData, (d) => d.value)

    // даты нужно интерполировать на ось Х
    const x = d3.scaleTime(
      [minDate || new Date(), maxDate || new Date()],
      [0, params.width - 2 * params.margin]
    )

    const y = d3
      .scaleLinear()
      .domain([minValue || 0, maxValue || 100])
      .range([params.height - 2 * params.margin, 0])

    //const formatDate = makeFormatLocale(localeRU)

    const xAxis = d3.axisBottom(x)/* .tickFormat(formatDate) */

    const yAxis = d3.axisLeft(y)

    // генератор линий на основе дат
    const line = d3
      .line<DatePrice>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.value))
      .curve(d3.curveCatmullRom.alpha(0.5))

    // выбор контейнера svg для графика и установка его размеров
    const svg = d3
      .select(`#chart${params.uniqueId}`)
      .attr("width", params.width)
      .attr("height", params.height)
      .attr("padding", params.margin)
      .append("g")
      .attr("transform", `translate(0, 0)`)

    /** рисование осей координат */
    makeChartLineAxis(
      svg,
      xAxis,
      yAxis,
      params.width,
      params.height,
      params.margin,
      params.uniqueId
    )

    /** рисование вертикальных линий  - показ при ховере */
    makeVLine(
      svg,
      flatData,
      x,
      y,
      params.width,
      params.height,
      params.margin,
      params.tooltip,
      params.linedata,
      params.uniqueId,
      params.units
    )

    params.linedata.forEach((item, index) => {
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
      const lineparams = {
        position: item,
        svg,
        line,
        x,
        y,
        width: params.width,
        color: colorSet[index],
        uniqueId: params.uniqueId,
        height: params.height,
        margin: params.margin,
        tooltip: params.tooltip,
      }

      serviceLineChart.renderLine(lineparams)
    })
  },

  /**
   *
   * Функция для рисования каждой линии из входного массива
   * @param {SingleLineApi} params - данные для линии графика
   */
  renderLine(params: SingleLineApi) {
    const datevalue = params.position.dates

    // рисование линии
    const g = params.svg
      .append("path")
      .attr("d", params.line(datevalue))
      .attr("transform", `translate(${params.margin}, ${params.margin})`)
      .attr("fill", "none")
      .attr("stroke", params.color)
      .attr("stroke-width", 2)

    makeLineAnimation(g, params.uniqueId)

    /** рисование точек для значений на линии графика - при ховере */
    makeChartDot(
      params.position.id,
      params.svg,
      datevalue,
      params.x,
      params.y,
      params.width,
      params.height,
      params.margin,
      params.tooltip,
      params.color,
      params.uniqueId
    )
  },
}

export default serviceLineChart
