<template>
  <svg
    v-if="icon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    version="1.1"
    v-html="appcontent.getIcon(icon)"
  ></svg>

  <span
    v-if="title"
    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible whitespace-nowrap"
  >
    {{ title }}
  </span>
</template>


<script lang="ts" setup>
/**
 * Компонент для вывода кнопки меню - иконка и название
 */
import appcontent from "~/services/apidata/mock"

const props = defineProps({
  title: {
    type: String,
  },
  icon: {
    type: String,
    required: false
  }
})
</script>