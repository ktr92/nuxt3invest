<template>
  <div class="overflow-x-auto w-full tablemain">
    <table class="min-w-full divide-y-2 divide-gray-200">
      <thead class="ltr:text-left rtl:text-right">
        <tr class="*:font-medium *:text-gray-900">
          <th v-for="item in tableHeader" :key="item" class="px-3 py-2 whitespace-nowrap">{{ item }}</th>
        </tr>
      </thead>
  
      <tbody class="divide-y divide-gray-200 *:even:bg-gray-50">
         <tr v-for="item in tableData" :key="item.ticker" class="*:text-gray-900 *:first:font-medium">
         <td v-for="value in Object.values(item)" :key="value" class="px-3 py-2 whitespace-nowrap">{{ value }}</td>
       </tr>
       
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  const tableHeader = [
    "Актив",
    "Количество",
    "Средняя цена",
    "Стоимость",
    "Прибыль"
  ]
  const tableData = [
    {
      ticker: "HYDR",
      count: 1000,
      price: 0.5,
      total: 500,
      change: 5
    },
    {
      ticker: "ROSN",
      count: 1000,
      price: 0.5,
      total: 500,
      change: 5
    },
    {
      ticker: "LKOH",
      count: 1000,
      price: 0.5,
      total: 500,
      change: 5
    },
    {
      ticker: "ASTR",
       count: 1000,
      price: 0.5,
      total: 500,
      change: 5
    },

  ]
</script>

<style scoped>
  .tablemain {
     transition: margin-left 0.3s ease-out, width 0.3s ease-out; 
  }
</style>