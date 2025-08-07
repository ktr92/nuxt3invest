<template>
  <div class="w-full">
    <TableDeals :tableheader="appcontent.deals.tableHeader" :tabledata="appcontent.deals.tableData" />
  </div>
</template>

<script setup lang="ts">
import appcontent from '~/services/apidata/mock'

definePageMeta({
  layout: "default",
})
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
