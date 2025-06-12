<template>
  <div class="w-full">
    <TableDeals :tableheader="tableHeader" :tabledata="tableData" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
})

onMounted(() => {})

const tableHeader = [
  "Дата",
  "Операция",
  "Актив",
  "Количество",
  "Цена покупки",
  "Цена продажи",
  "Прибыль",
]

const tableData = [
  {
    ticker: "HYDR",
    type: 'buy',
    name: "Русгидро",
    count: 1000,
    buyprice: 0.5,
    saleprice: 0.6,
    dealdate: "02.01.2024",
  },
  {
    ticker: "ROSN",
    type: 'buy',
    name: "Роснефть",
    count: 12323,
    buyprice: 500,
    saleprice: 550,
    dealdate: "02.01.2024",
  },
  {
    ticker: "LKOH",
    type: 'sell',
    name: "Лукойл",
    count: 444,
    buyprice: 6000,
    saleprice: 6300,
    dealdate: "02.01.2024",
  },
  {
    ticker: "ASTR",
    type: 'buy',
    name: "Астра",
    count: 22,
    buyprice: 500,
    saleprice: 420,
    dealdate: "02.01.2024",
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
