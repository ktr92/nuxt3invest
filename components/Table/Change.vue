<template>
  <div>
    <div v-if="price">
      <p
        class="text-md font-medium text-gray-900"
        :class="[ispositive ? 'text-green-600' : 'text-red-600']"
      >
        {{ ispositive ? "+" : "" }}{{ numberFormat(price.toFixed(2)) }} ₽
      </p>
    </div>

    <div
      class="mt-1 flex gap-1"
      :class="[ispositive ? 'text-green-600' : 'text-red-600']"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        v-if="ispositive"
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

      <p class="flex gap-2 text-sm">
        <span
          class="font-bold"
          v-if="change"
          :class="[ispositive ? 'text-green-600' : 'text-red-600']"
        >
          {{ ispositive ? "+" : ""
          }}{{ numberFormat(change.toFixed(2)) }} %</span
        >

        <span class="text-gray-500" v-if="date"> {{ date }} </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  price: {
    type: [Number],
    default: "",
  },
  change: {
    type: [Number],
    default: "",
  },
  date: {
    type: [String],
    default: "",
  },
})

const price = computed(() => (props.price ? Number(props.price) : 0))

const ispositive = computed(() => {
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
