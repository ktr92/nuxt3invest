<template>
  <div class="w-full">
    <TableMain :tableheader="tableHeader" :tabledata="tableData" />
    <div v-if="chartData && chartData.length">
    <ChartLine :data="chartData" />
    </div>
  </div>
</template>

<script setup lang="ts">


const { data: candles } = useNuxtData('candles')
const { data: instruments } = useNuxtData('instruments')


const chartData = computed(() => {
  return candles.value?.map((item: LineData) => {
    const ticker = instruments.value.filter((share: any) => share[0].figi === item.id)[0][0].ticker
    return {   
      dates: item.dates,
      id: ticker,
    }
  })
})


const tableHeader = [
  "Актив",
  "Количество",
  "Средняя цена",
  "Вложено",
  "Стоимость",
  "Прибыль",
  "Доходность",
]

const tableData = [
  {
    ticker: "HYDR",
    name: "Русгидро",
    count: 1000,
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
    change: 13,
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
    change: -10,
    yearchange: -20,
    openDate: "23.01.2025",
  },
]
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
  z-index: -999;
}

/* неактивное состояние */
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* активное состояние */
.slide-enter-to,
.slide-leave-from {
  left: 0;
  opacity: 1;
}
</style>
