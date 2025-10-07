<template>
  <span  class="text-sm text-gray-700">
    <span class="font-semibold text-nowrap">{{ boldtext }}</span>
    <span class="text-gray-400 text-nowrap">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
    boldtext: {
      type: [String, Number],
      default: ""
    },
    text: {
      type: [String, Number],
      default: ""
    },
    classes: {
      type: String,
      default: ""
    }
  })
</script>

<style scoped>
  span {
    line-height: 1.2;
    display: block;
  }
</style>