<template>
  <div class="bg-white shadow-md p-4 rounded-lg">
  
      <div
        class="font-semibold mb-4 text-xl text-gray-600"
      >
        {{ portfolio.name }}
      </div>

    <div class="flex justify-between w-full">
      <div>
        <div class="text-gray-600">Value</div>
        <div class="font-semibold text-gray-600 text-lg text-nowrap">
          {{ numberFormat(portfolio.total) }} ₽
        </div>
      </div>
      <div class="text-right">
        <TableChange
          :price="portfolio.change"
          :change="portfolio.changePercent"
          date="of the amount of deposits"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * компонент отображает сводку по портфелю
 */
const props = defineProps({
  portfolio: {
    type: Object as PropType<IPortfolioView>,
    required: true,
  },
})
</script>
