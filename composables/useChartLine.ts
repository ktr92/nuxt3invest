import * as d3 from "d3"
/**
 * Функция рисует вертикальные линии для значений X
 * useСhartLine_hline(svg, props.data, y, width, margin);
 * @param svg - "холст" из шаблона
 * @param DateValues - данные на основе которых строится график {date, value}[]
 * @param y - функция масштабирования по оси Y
 * @param width - ширина холста
 * @param margin - отступы холста
 * @param tooltip - подсказка при наведении
 * @param data: 
 */
export const useVLine = (
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  DateValues: DatePrice[],
  x: (value: d3.NumberValue) => number,
  y: (value: d3.NumberValue) => number,
  width: number,
  height: number,
  margin: number,
  tooltip: Tooltip,
  data: LineData[],
  uniqueId: string,
  units?: string
): void => {
  svg
    .selectAll(".vline")
    .data(DateValues)
    .enter()
    .append("rect")
    /* .append("line") */
    /*  .classed("grid-line", true) */
    .attr("class", "vline")
    .attr("x", (d) => x(new Date(d.date)))
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height - margin * 2)
    /* .attr("x1", (d) => x(new Date(d.date)))
    .attr("y1", 0)
    .attr("x2", (d) => x(new Date(d.date)))
    .attr("y2", height - 2 * margin) */
    /*  .attr("stroke", "#eee")
    .attr("stroke-width", Math.ceil(width / DateValues.length)) */
    .attr("fill", "transparent")
    .attr("data-value", (d) => d.value)
    .attr("data-id", (d) => d.date + `-${uniqueId}`)
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("opacity", 0)
    .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1)
      d3.selectAll(`circle[data-id="${d.date}-${uniqueId}"]`).attr("opacity", 1)

      const hoverdate = d3.select(this).attr(`data-id`)
      useShowTooltip(
        tooltip,
        `${d.date}-${uniqueId}`,
        useDateValueTooltip(data, hoverdate, d.date, uniqueId, units),
        [x(new Date(d.date)), y(d.value) + 10]
      )
      /*   useShowTooltip(
        tooltip,
        d.date,
          `<div class="text-white font-black;">${d.date}</div> <div class=" font-black; text-lg ${d.value >= 0 ? 'text-green-400' : 'text-red-400'}">${d.value}</div>`,
        [x(new Date(d.date)), y(d.value) + 10]
      ) */
    })
    .on("mouseleave", function (e, d) {
      d3.select(this).attr("opacity", 0)
      d3.selectAll(`circle[data-id="${d.date}-${uniqueId}"]`).attr("opacity", 0)
      useHideTooltip(tooltip)
    })
}

/**
 * Функция рисует горизонтальные линии для значений Y
 * useСhartLine_hline(svg, props.data, y, width, margin);
 * @param svg - "холст"
 * @param DateValues - данные
 * @param y - функция масштабирования по оси Y
 * @param width - ширина холста
 * @param margin - отступы холста
 */
export const useHLine = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  DateValues: DatePrice[],
  y: (value: d3.NumberValue) => number,
  width: number,
  margin: number,
  uniqueId: string
): void => {
  svg
    .selectAll(".hline")
    .data(DateValues)
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
    .attr("opacity", 0)
    .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1)
    })
    .on("mouseleave", function (e, d) {
      d3.select(this).attr("opacity", 0)
    })
}

/** */
export const useChartDot = (
  id: string,
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  DateValues: DatePrice[],
  x: (value: d3.NumberValue) => number,
  y: (value: d3.NumberValue) => number,
  width: number,
  height: number,
  margin: number,
  tooltip: Tooltip,
  color: string,
  uniqueId: string
) => {
  svg
    .selectAll(`.dot-${id}-${uniqueId}`)
    .data(DateValues)
    .enter()
    .append("circle")
    .attr("class", `dot-${id}-${uniqueId}`)
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr("r", 4)
    .attr("cx", (d) => x(new Date(d.date)))
    .attr("cy", (d) => y(d.value))
    .attr("fill", "white")
    .attr("data-value", (d) => d.value)
    .attr("data-id", (d) => d.date + `-${uniqueId}`)
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("opacity", 0)
  /* .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1)
      useShowTooltip(
        tooltip,
        d.date,
        `<div class="text-white font-black;">${id} ${d.date}</div> <div class=" font-black; text-lg ${d.value >= 0 ? 'text-green-400' : 'text-red-400'}">${d.value}</div>`,
        [x(new Date(d.date)), y(d.value) + 10]
      )
    })
    .on("mouseleave", function (e, d) {
      d3.select(this).attr("opacity", 0)
    }) */
}

/**
 * Локализация дат для осей графика D3
 * @returns {d3.TimeLocaleDefinition}
 */
export const useChartLocale = () => {
  const ruLocale = {
    dateTime: "%A, %e %B %Y г. %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
    ],
    shortDays: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    months: [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ],
    shortMonths: [
      "янв",
      "фев",
      "мар",
      "апр",
      "май",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек",
    ],
  }

  /**
   * Приводим к нужному типу TimeLocaleDefinition @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/d3-time-format/index.d.ts
   */
  return {
    ...ruLocale,
    periods: Array.from(ruLocale.periods),
    days: Array.from(ruLocale.days),
    shortDays: Array.from(ruLocale.shortDays),
    months: Array.from(ruLocale.months),
    shortMonths: Array.from(ruLocale.shortMonths),
  } as d3.TimeLocaleDefinition
}

export const useFormatLocale = (locale: d3.TimeLocaleObject) => {
  return (
    domainValue: Date | number | { valueOf(): number },
    _index: number
  ): string => {
    let date: Date
    if (domainValue instanceof Date) {
      date = domainValue
    } else if (typeof domainValue === "number") {
      date = new Date(domainValue)
    } else if (domainValue && typeof domainValue.valueOf === "function") {
      date = new Date(domainValue.valueOf())
    } else {
      date = new Date()
    }
    return locale.format("%b %Y")(date)
  }
}

export const useChartLineAxis = (
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  xAxis: d3.Axis<d3.NumberValue | Date>,
  yAxis: d3.Axis<d3.NumberValue | Date>,
  width: number,
  height: number,
  margin: number,
  uniqueId: string
) => {
  const gxAxis = svg
    .append("g")
    .attr("transform", `translate(${margin}, ${height - margin})`)
    .call(xAxis)
  const gyAxis = svg
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`)
    .call(yAxis)

  const axisStyle = "stroke-gray-400"
  const axisTextStyle = "text-gray-400  text-[11px] "

  gxAxis
    .selectAll(".tick text")    
    .attr("class", axisTextStyle)
   gyAxis
    .selectAll(".tick text")
    .attr("class", axisTextStyle)
    
  gxAxis
    .selectAll(".domain")    
    .attr("class", axisStyle)
  gyAxis
    .selectAll(".domain")    
    .attr("class", axisStyle)

 
}

export const useDateValueTooltip = (
  data: LineData[],
  hoverdate: string,
  currentdate: string,
  uniqueId: string,
  units?: string
) => {
  let text = ""

  data.forEach((item) => {
    const datafilter = item.dates.filter((date) => date.date == currentdate)[0]
    if (datafilter) {
      const val = datafilter.value
      const idColor = d3.select(`circle.dot-${item.id}-${uniqueId}`).attr("stroke")
      text += `<div>
        <span  style="background: ${idColor};" class="inline-block w-2 h-2"></span>
        <span  >${item.id} </span>
        <span  class="${
          val >= 0 ? "text-green-300" : "text-red-300"
        }">${numberFormat(val)}${units ? units : ''}</span>
        </div>`
    }
  })

  return `<div class="text-white font-black;">
  ${new Date(currentdate).toLocaleString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}</div> 
         <div class="font-bold text-md ">${text}</div>`
}

export const useLineAnimation = (
  g: d3.Selection<SVGPathElement, unknown, HTMLElement, any>,
  uniqueId: string
) => {
  const totalLength = g.node()?.getTotalLength
  if (totalLength) {
    g.attr("stroke-dasharray", totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1200)
      .attr("stroke-dashoffset", 0)
  }
}
