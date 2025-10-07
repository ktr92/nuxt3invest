function styleAxis(
  gxAxis: d3.Selection<SVGGElement, unknown, HTMLElement, any> | d3.Selection<SVGGElement, unknown, null, undefined>,
  gyAxis: d3.Selection<SVGGElement, unknown, HTMLElement, any> | d3.Selection<SVGGElement, unknown, null, undefined>
) {
  const axisStyle = "stroke-gray-400"
  const axisTextStyle = "text-gray-400  text-[11px] "

  gxAxis.selectAll(".tick text").attr("class", axisTextStyle)
  gyAxis.selectAll(".tick text").attr("class", axisTextStyle)

  gxAxis.selectAll(".domain").attr("class", axisStyle)
  gyAxis.selectAll(".domain").attr("class", axisStyle)
}

function makeChartLineAxis(
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  xAxis: d3.Axis<d3.NumberValue | Date>,
  yAxis: d3.Axis<d3.NumberValue | Date>,
  width: number,
  height: number,
  margin: number,
  uniqueId: string
) {
  const gxAxis = svg
    .append("g")
    .attr("transform", `translate(${margin}, ${height - margin})`)
    .call(xAxis)
  const gyAxis = svg
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`)
    .call(yAxis.ticks(10)
      .tickFormat(d => d === null ? '' : numberFormat(Math.round(Number(d)), 0).toString()))


  styleAxis(gxAxis, gyAxis)
}

export { makeChartLineAxis, styleAxis }
