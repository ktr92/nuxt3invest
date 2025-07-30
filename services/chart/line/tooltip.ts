import * as d3 from "d3"

function makeDateValueTooltip  (
  data: LineData[],
  hoverdate: string,
  currentdate: string,
  uniqueId: string,
  units?: string
) {
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

/**
 * Вывод подсказки при ховере
 */
function showTooltip (
  tooltip: Tooltip,
  tooltipText: string,
  coord: number[]
) {

  tooltip.text = tooltipText
  tooltip.visible = true
  tooltip.x = coord[0] - 20
  tooltip.y = coord[1]

  return true
  
}

function hideTooltip (tooltip: Tooltip) {
  tooltip.visible = false
  return false
}



export {makeDateValueTooltip, showTooltip, hideTooltip}