<template>
  <div class="overflow-x-auto w-full tablemain">
    <table class="min-w-full divide-y-2 divide-gray-200">
      <thead class="ltr:text-left rtl:text-right">
        <tr class="*:font-semibold*:text-gray-900 text-md">
          <th
            v-for="item in tableHeader"
            :key="item"
            class="p-2 whitespace-nowrap text-semibold"
          >
            {{ item }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 *:even:bg-gray-50">
        <tr
          v-for="item in tableData"
          :key="item.ticker"
          class="*:text-gray-900 *:first:font-medium"
        >
          <td class="p-2">
            <TableAsset :name="item.name" :ticker="item.ticker" />
          </td>
          <td class="p-2">
            <TableText :text="numberFormat(item.count)" />
          </td>
          <td class="p-2">
            <TableText :text="numberFormat(item.price)" />
          </td>
          <td class="p-2">
            <TableText :text="numberFormat(item.price * item.count)" />
          </td>
          <td class="p-2">
            <TableTextdouble :newtotal="numberFormat(item.newprice * item.count)" :newprice="numberFormat(item.newprice)" />
          </td>
          <td class="p-2">
            <TableChange
              :price="item.pricechange"
              change="23"
              :date="item.openDate"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { numberFormat } from '#imports';
const tableHeader = [
  "Актив",
  "Количество",
  "Средняя цена",
  "Вложено",
  "Стоимость",
  "Прибыль",
];

const tableData = [
  {
    ticker: "HYDR",
    name: "Русгидро",
    count: 1000,
    price: 0.5,
    newprice: 0.6,
    pricechange: 0.1,
    total: 500,
    change: 5,
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
    change: 5,
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
    change: 5,
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
    change: 5,
    openDate: "23.01.2025",
  },
]
</script>

<style scoped>
.tablemain {
  transition: margin-left 0.3s ease-out, width 0.3s ease-out;
}
</style>
