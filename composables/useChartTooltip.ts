/**
 * Вывод подсказки при ховере
 * @param category - категория для идентификации
 * @param tooltipText - текст подсказки
 */


export const useShowTooltip = (
  tooltip: Tooltip,
  category: string,
  tooltipText: string,
  coord: number[]
) => {

  tooltip.text = tooltipText
  tooltip.visible = true
  /*  const [mouseX, mouseY] = d3.pointer(event, container.value) */
  tooltip.x = coord[0] - 20
  tooltip.y = coord[1]
}

export const useHideTooltip = (tooltip: Tooltip) => {
  tooltip.visible = false
}
