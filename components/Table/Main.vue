<template>
  <div class="overflow-x-auto w-full tablemain">
    <table class="min-w-full divide-y-2 divide-gray-200">
      <thead class="ltr:text-left rtl:text-right">
        <tr class="*:font-semibold*:text-gray-900 text-md">
          <th v-for="item in tableHeader" :key="item" class="p-2 whitespace-nowrap text-semibold">{{ item }}</th>
        </tr>
      </thead>
  
      <tbody class="divide-y divide-gray-200 *:even:bg-gray-50">
         <tr v-for="item in tableData" :key="item.ticker" class="*:text-gray-900 *:first:font-medium">
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
    "Вложено",
    "Стоимость",
    "Прибыль"
  ]
  const tableData = [
    {
      ticker: "HYDR",
      name: 'Русгидро',
      count: 1000,
      price: 0.5,
      total: 500,
      change: 5
    },
    {
      ticker: "ROSN",
        name: 'Роснефть',
      count: 12323,
      price: 420,
      total: 500,
      change: 5
    },
    {
      ticker: "LKOH",
        name: 'Лукойл',
      count: 444,
      price: 6500,
      total: 500,
      change: 5
    },
    {
      ticker: "ASTR",
        name: 'Астра',
       count: 33213,
      price: 545,
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