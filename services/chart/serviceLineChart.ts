import * as d3 from "d3"
import generateColors from "~/utils/colorGenerate"

 

/** массив цветов для линий */
const colorSet = generateColors(100)

const serviceApiData = {
  renderLineChart(params: LineChartApi) {
    const localeRU = d3.timeFormatLocale(useChartLocale())

    // проверяем входные данные для графика
    if (
      !params.linedata ||
      !Array.isArray(params.linedata) ||
      params.linedata.length === 0
    ) {
      d3.select("").selectAll("*").remove()
      useHideTooltip(params.tooltip)
      return
    }

    // перед рисованием графика очищаем контейнер
    d3.select(`#chart${params.uniqueId}`).selectAll("*").remove()

    const flatData = params.linedata.flatMap((item) => item.dates)

    const minCategory = d3.min(flatData, (d) => new Date(d.date))
    const maxCategory = d3.max(flatData, (d) => new Date(d.date))
    const minValue = d3.min(flatData, (d) => d.value)
    const maxValue = d3.max(flatData, (d) => d.value)

    // даты нужно интерполировать на ось Х
    const x = d3.scaleTime(
      [minCategory || new Date(), maxCategory || new Date()],
      [0, params.width - 2 * params.margin]
    )

    const y = d3
      .scaleLinear()
      .domain([minValue || 0, maxValue || 100])
      .range([params.height - 2 * params.margin, 0])

    const formatDate = useFormatLocale(localeRU)

    const xAxis = d3.axisBottom(x).tickFormat(formatDate)

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
    useChartLineAxis(
      svg,
      xAxis,
      yAxis,
      params.width,
      params.height,
      params.margin,
      params.uniqueId
    )

    /** рисование вертикальных линий  - показ при ховере */
    useVLine(
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
      const linedata = {
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

      serviceApiData.renderLine(linedata)
    })
  },

  /**
   *
   * Функция для рисования каждой линии из входного массива
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

    useLineAnimation(g, params.uniqueId)

    /** рисование точек для значений на линии графика - при ховере */
    useChartDot(
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

export default serviceApiData
