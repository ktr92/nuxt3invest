<template>
  <div class="w-full">
    <h1>Пример диаграммы на D3 с Nuxt 3 и Vue 3</h1>
   <!--  <ChartBar :data="chartData" /> -->
    <ChartPie :data="chartData" />
  </div>
</template>

<script setup lang="ts">

const loadData = [
  {
    ticker: "HYDR",
    name: "Русгидро",
    count: 6000000,
    price: 0.5,
    newprice: 0.6,
    pricechange: 0.1,
    total: 500,
    change: 11,
    yearchange: 12,
    openDate: "02.01.2024",
  },
  {
    ticker: "ROSN",
    name: "Роснефть",
    count: 12323,
    price: 420,
    newprice: 320,
    pricechange: -100,
    total: 500,
    change: -13,
    yearchange: 11,
    openDate: "02.03.2024",
  },
  {
    ticker: "LKOH",
    name: "Лукойл",
    count: 444,
    price: 6500,
    newprice: 6700,
    pricechange: 200,
    total: 500,
    change: 22,
    yearchange: 32,
    openDate: "22.11.2024",
  },
  {
    ticker: "ASTR",
    name: "Астра",
    count: 33213,
    price: 545,
    newprice: 567,
    pricechange: 22,
    total: 500,
    change: 10,
    yearchange: -20,
    openDate: "23.01.2025",
  },
]

const chartData = computed(() => {
  return loadData.map(item => {
    return {
      category: item.name,
      value: item.count * item.newprice,
      ticker: item.ticker,
      startvalue: item.count * item.price,
      pricechange: item.count * item.newprice - item.count * item.price,
      change: item.change
    }
  })
  
})


</script>