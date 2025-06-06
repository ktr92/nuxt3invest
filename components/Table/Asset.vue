<template>
  <div class="">
      <a href="#" target="_blank" class="flex items-center">
        <span class="w-auto h-8 mr-3 ">
          <img :src="logo" width="32" height="32" class="min-w-[22px] rounded-md">
        </span>
        <span>
          <span class="block font-semibold text-md leading-[1.2] text-gray-900 whitespace-nowrap dark:text-white">{{name}}</span>
          <span class="block font-semibold bg-primary-100 text-slate-400 text-xs font-medium rounded dark:bg-primary-900 dark:text-primary-300">{{ticker}}</span>
          </span>  
      </a>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  ticker: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  }
})

  const mainstore = useMainstore()
  const logo = mainstore.generateLogo(props.ticker)
</script>

<style scoped>

</style>