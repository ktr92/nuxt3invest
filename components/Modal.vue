<template>
  <div
    class="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4 "
    role="dialog"
    aria-modal="true"
    aria-labelledby="modalTitle"
  >
    <div class="w-[500px] max-w-full rounded-lg bg-white p-6 shadow-lg ">
      <h2 id="modalTitle" class="text-xl font-bold text-gray-900 sm:text-2xl">{{ modalTitle }}</h2>
  
      <div class="mt-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modalTitle: string
  }>()
</script>

<style scoped>

</style>