export function useChartWidth(chartcontainer: Ref<HTMLElement | null>) {
  const width = ref(600)

  const getWidth = () => {
    if (chartcontainer.value) {
      width.value = chartcontainer.value.clientWidth
    }
  }
  onMounted(() => {
    getWidth()
    window.addEventListener("resize", getWidth)
  })
  onUnmounted(() => window.removeEventListener("resize", getWidth))

  return { width }
}
