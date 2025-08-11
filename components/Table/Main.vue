<template>
  <div class="overflow-x-auto w-full tablemain">
    <table class="min-w-full divide-y-2 divide-gray-200">
      <thead class="ltr:text-left rtl:text-right">
        <tr class="*:font-semibold*:text-gray-900 text-md">
          <th
            v-for="item in tableheader"
            :key="item"
            class="p-2 whitespace-nowrap text-semibold"
          >
            {{ item }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 ">
        <tr
          v-for="item in tabledata"
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
            <TableTextdouble :boldtext="numberFormat(item.newprice || 1 * item.count)" :text="numberFormat(item.newprice || 1)" />
          </td>  
          <td class="p-2">
            <TableChange
              :price="item.pricechange"
              :change="item.change"
              :date="item.openDate"
            />
          </td>
          <td class="p-2">
            <TableChange
              :change="item.yearchange"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { numberFormat } from '#imports';

const props = defineProps({
  tableheader: {
    type: Array<string>,
    required: true,
  },
  tabledata: {
    type: Array<IPositionView>,
    required: true
  }
})

</script>

<style scoped>
.tablemain {
  transition: margin-left 0.3s ease-out, width 0.3s ease-out;
}
</style>
