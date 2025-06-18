function getColor() {
  return `hsla(${~~(360 * Math.random())}, 70%,  88%, 0.8)`
}
export default function generateColors(count: number) {
  const colors = []
  for (let i = count; i--; ) {
    colors.push(getColor())
  }

  return colors
}
