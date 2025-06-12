<template>
  <div>
    <h1>Пример диаграммы на D3 с Nuxt 3 и Vue 3</h1>
    <ChartBar :data="chartData" />
  </div>
</template>

<script setup lang="ts">

const chartData = [
  { category: 'A', value: 30 },
  { category: 'B', value: 80 },
  { category: 'C', value: 45 },
  { category: 'D', value: 60 },
  { category: 'E', value: 20 },
  { category: 'F', value: 90 },
  { category: 'G', value: 55 }
]
</script>