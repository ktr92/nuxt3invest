import * as d3 from "d3"
/**
 * Функция рисует вертикальные линии для значений X
 * useСhartLine_hline(svg, props.data, y, width, margin);
 * @param svg - "холст"
 * @param DateValues - данные
 * @param y - функция масштабирования по оси Y
 * @param width - ширина холста
 * @param margin - отступы холста
 */
export const useVLine = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  DateValues: DatePrice[],
  x: (value: d3.NumberValue) => number,
  y: (value: d3.NumberValue) => number,
  width: number,
  height: number,
  margin: number,
  tooltip: Tooltip
): void => {
  svg
    .selectAll(".vline")
    .data(DateValues)
    .enter()
    .append("line")
    .classed("grid-line", true)
    .attr("class", "vline")
    .attr("x1", (d) => x(new Date(d.date)))
    .attr("y1", 0)
    .attr("x2", (d) => x(new Date(d.date)))
    .attr("y2", height - 2 * margin)
    .attr("stroke", "#eee")
    .attr("stroke-width", Math.ceil(width / DateValues.length))
    .attr("data-value", (d) => d.price)
    .attr("data-id", (d) => d.date)
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("opacity", 0)
    .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1)
      d3.select(`circle[data-id="${d.date}"]`).attr("opacity", 1)
      useShowTooltip(
        tooltip,
        d.date,
        `<div class="text-white font-black;">${d.date}</div> <div class="text-green-400 font-black; text-lg">${d.price} ₽</div>`,
        [x(new Date(d.date)), y(d.price) + 10]
      )
    })
    .on("mouseleave", function (e, d) {
      d3.select(this).attr("opacity", 0)
      d3.select(`circle[data-id="${d.date}"]`).attr("opacity", 0)
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
  margin: number
): void => {
  svg
    .selectAll(".hline")
    .data(DateValues)
    .enter()
    .append("line")
    .classed("grid-line", true)
    .attr("class", "hline")
    .attr("x1", 0)
    .attr("y1", (d) => y(d.price))
    .attr("x2", width - 2 * margin)
    .attr("y2", (d) => y(d.price))
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

export const useChartDot = (
  id: string,
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  DateValues: DatePrice[],
  x: (value: d3.NumberValue) => number,
  y: (value: d3.NumberValue) => number,
  width: number,
  height: number,
  margin: number,
  tooltip: Tooltip,
  color: string
) => {
  svg
    .selectAll(`.dot-${id}`)
    .data(DateValues)
    .enter()
    .append("circle")
    .attr("class", `dot-${id}`)
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr("r", 4)
    .attr("cx", (d) => x(new Date(d.date)))
    .attr("cy", (d) => y(d.price))
    .attr("fill", "white")
    .attr("data-value", (d) => d.price)
    .attr("data-id", (d) => d.date)
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("opacity", 0)
    .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1)
      useShowTooltip(
        tooltip,
        d.date,
        `<div class="text-white font-black;">${d.date}</div> <div class="text-green-400 font-black; text-lg">${d.price} ₽</div>`,
        [x(new Date(d.date)), y(d.price) + 10]
      )
    })
    .on("mouseleave", function (e, d) {
      d3.select(this).attr("opacity", 0)
    })
}

export const useChartLocale = () => {
  return {
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
}

export const useChartLineAxis = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  xAxis: d3.Axis<d3.NumberValue | Date>,
  yAxis: d3.Axis<d3.NumberValue | Date>,
  width: number,
  height: number,
  margin: number
) => {
  svg
    .append("g")
    .attr("transform", `translate(${margin}, ${height - margin})`)
    .call(xAxis)
  svg
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`)
    .call(yAxis)
}
