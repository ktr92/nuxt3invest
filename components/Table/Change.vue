<template>
  <div>
    <p
      class="text-sm font-medium text-gray-900"
      :class="[isover ? 'text-green-600' : 'text-red-600']"
    >
      {{ price }}
    </p>
  </div>

  <div
    class="mt-1 flex gap-1"
    :class="[isover ? 'text-green-600' : 'text-red-600']"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      v-if="isover"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      v-else
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      ></path>
    </svg>

    <p class="flex gap-2 text-xs">
      <span class="font-bold"> {{ change }} %</span>

      <span class="text-gray-500"> {{ date }} </span>
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  price: {
    type: [String, Number],
    default: "",
  },
  change: {
    type: [String, Number],
    default: "",
  },
  date: {
    type: [String],
    default: "",
  },
})

const isover = computed(() => {
  let priceNumber = props.change
  if (typeof priceNumber === "string") {
    priceNumber = parseFloat(priceNumber)
  }
  return priceNumber > 0
})
</script>

<style scoped>
span {
  line-height: 1.2;
  display: block;
}
</style>
