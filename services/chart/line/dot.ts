function makeChartDot (
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
) {
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

export {makeChartDot}