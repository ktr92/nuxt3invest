import * as d3 from "d3"
/**
 * Функция рисует вертикальные линии для значений X 
 * useСhartLine_hline(svg, props.data, y, width, margin);
 * @param svg - "холст"
 * @param dataitems - данные 
 * @param y - функция масштабирования по оси Y
 * @param width - ширина холста
 * @param margin - отступы холста
 */
export const useVLine = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  dataitems: DataItem[],
  x: (value: d3.NumberValue) => number,
  y: (value: d3.NumberValue) => number,
  width: number,
  height: number,
  margin: number,
  tooltip: Tooltip
): void => {
  svg
    .selectAll(".vline")
    .data(dataitems)
    .enter()
    .append("line")
    .classed("grid-line", true)
    .attr("class", "vline")
    .attr("x1", (d) => x(new Date(d.category)))
    .attr("y1", 0)
    .attr("x2", (d) => x(new Date(d.category)))
    .attr("y2", height - 2 * margin)
    .attr("stroke", "#ddd")
    .attr("stroke-width", 2)
    .attr("data-value", (d) => d.value)
    .attr("data-id", (d) => d.category)
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("opacity", 0)
     .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1)
      d3.select(`circle[data-id="${d.category}"]`).attr("opacity", 1);
      useShowTooltip(tooltip, d.category, String(d.value), [
        x(new Date(d.category)) + y(d.value),
        height / 2 + d.value - 15,
      ])
    })
    .on("mouseleave", function (e, d) {
      d3.select(this).attr("opacity", 0)
      d3.select(`circle[data-id="${d.category}"]`).attr("opacity", 0)
      useHideTooltip(tooltip)
    })
}


/**
 * Функция рисует горизонтальные линии для значений Y
 * useСhartLine_hline(svg, props.data, y, width, margin);
 * @param svg - "холст"
 * @param dataitems - данные 
 * @param y - функция масштабирования по оси Y
 * @param width - ширина холста
 * @param margin - отступы холста
 */
export const useHLine = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  dataitems: DataItem[],
  y: (value: d3.NumberValue) => number,
  width: number,
  margin: number
): void => {
  svg
    .selectAll(".hline")
    .data(dataitems)
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


export const useChartDot = (
    svg: d3.Selection<SVGGElement, unknown, null, undefined>,
    dataitems: DataItem[],
    x: (value: d3.NumberValue) => number,
    y: (value: d3.NumberValue) => number,
    width: number,
    height: number,
    margin: number,
    tooltip: Tooltip
) => {
  svg.selectAll(".dot")
    .data(dataitems)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('style', `border: 2px solid steelblue`)
    .attr('r', 3)
    .attr('cx', d => x(new Date(d.category)))
    .attr('cy', d => y(d.value))
    .attr('fill', 'steelblue')
    .attr('data-value', d => d.value)
    .attr('data-id', d => d.category)
    .attr('transform', `translate(${margin}, ${margin})`)
    .attr("opacity", 0)
    .on("mouseover", function (e, d) {
      d3.select(this).attr("opacity", 1)
    /*  showTooltip(d.category, String(d.value), [x(new Date(d.category)), height / 2 - margin * 2 + d.value - 15]) */
    })
    .on("mouseleave", function (e, d) {
     d3.select(this).attr("opacity", 0)
    })
}

export const useChartLineAxis = (
    svg: d3.Selection<SVGGElement, unknown, null, undefined>,,
    xAxis: d3.Axis<d3.NumberValue | Date>,
    yAxis: d3.Axis<d3.NumberValue | Date>,
    width: number,
    height: number,
    margin: number
) => {
    svg
    .append("g")
    .attr('transform', `translate(${margin}, ${height - margin})`)
    .call(xAxis)
    svg
    .append("g")
    .attr('transform', `translate(${margin}, ${margin})`)
    .call(yAxis)
}