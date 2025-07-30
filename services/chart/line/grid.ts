import * as d3 from "d3"
import { makeDateValueTooltip } from "./tooltip"
import { showTooltip, hideTooltip } from "./tooltip"

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
function makeVLine(
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
): void {
  svg
    .selectAll(".vline")
    .data(DateValues)
    .enter()
    .append("rect")
    .attr("class", "vline")
    .attr("x", (d) => x(new Date(d.date)))
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height - margin * 2)
    .attr("fill", "transparent")
    .attr("data-value", (d) => d.value)
    .attr("data-id", (d) => d.date + `-${uniqueId}`)
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("opacity", 0)
    .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1)
      d3.selectAll(`circle[data-id="${d.date}-${uniqueId}"]`).attr("opacity", 1)

      const hoverdate = d3.select(this).attr(`data-id`)
      showTooltip(
        tooltip,
        makeDateValueTooltip(data, hoverdate, d.date, uniqueId, units),
        [x(new Date(d.date)), y(d.value) + 10]
      )
    })
    .on("mouseleave", function (e, d) {
      d3.select(this).attr("opacity", 0)
      d3.selectAll(`circle[data-id="${d.date}-${uniqueId}"]`).attr("opacity", 0)
      hideTooltip(tooltip)
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
function makeHLine(
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  DateValues: DatePrice[],
  y: (value: d3.NumberValue) => number,
  width: number,
  margin: number,
  uniqueId: string
): void {
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

export {makeVLine, makeHLine}
