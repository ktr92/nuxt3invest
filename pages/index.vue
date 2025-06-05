<template>
  <div>
    <div class="flex gap-8">
      <Header />
      <Transition name="slide">
        <TableMain />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
  z-index: -999;
}

/* неактивное состояние */
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* активное состояние */
.slide-enter-to,
.slide-leave-from {
  left: 0;
  opacity: 1;
}
</style>
