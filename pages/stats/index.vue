<template>
  <div class="w-full" ref="chartcontainer">
    <ClientOnly class="w-full">
      <ChartCDataTimePrice :loadData="loadData" :width="width" />
      <ChartCDataTimeProfit :loadData="loadData" :width="width" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const chartcontainer = ref<HTMLDivElement | null>(null)

const width = computed(() =>
  chartcontainer.value ? chartcontainer.value.clientWidth : 600
)

// информация о портфеле грузится из БД
const loadData: ILoadData[] = [
  {
    ticker: "ROSN",
    isin: "RU000A0J2Q06",
    name: "Роснефть",
    count: 12323,
    price: 420,
    newprice: 380,
    pricechange: -40,
    total: 500,
    change: -6,
    yearchange: 11,
    openDate: "2024-03-02",
    share: 30,
  },
  {
    ticker: "ASTR",
    isin: "RU000A106T36",
    name: "Астра",
    count: 33213,
    price: 545,
    newprice: 567,
    pricechange: 22,
    total: 500,
    change: 10,
    yearchange: -20,
    openDate: "2024-12-02",

    share: 25,
  },
  {
    ticker: "SBER",
    isin: "RU0009029540",
    name: "Сбербанк",
    count: 300,
    price: 255,
    newprice: 567,
    pricechange: 22,
    total: 500,
    yearchange: -20,
    change: 10,
    openDate: "2024-11-02",
    share: 25,
  },
]

/* 
console.log("chartData :", chartData.value) */
</script>
