function makeLineAnimation (
  g: d3.Selection<SVGPathElement, unknown, HTMLElement, any>,
  uniqueId: string
) {
  const totalLength = g.node()?.getTotalLength
  if (totalLength) {
    g.attr("stroke-dasharray", totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1200)
      .attr("stroke-dashoffset", 0)
  }
}

export {makeLineAnimation}