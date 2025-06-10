<template>
  <span  class="text-sm text-gray-700">
    <span :class="classes">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
  const props = defineProps({
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
    line-height: 1;
    display: block;
  }
</style>