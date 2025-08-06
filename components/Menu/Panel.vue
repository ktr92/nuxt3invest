<template>
    <li v-for="menu in transformedMenu" :key="menu.title">
      <div
        v-if="menu.action"
        @click.prevent.stop="menu.action"
        class="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      >
        <MenuButton :title="menu.title" :icon="menu.icon" />
      </div>
      <NuxtLink
        v-else-if="menu.to"
        :to="menu.to"
        class="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      >
        <MenuButton :title="menu.title" :icon="menu.icon" />
      </NuxtLink>
    </li>
</template>
<script setup lang="ts">
/**
 * Компонент для вывода пунктов меню - ссылка либо кнопка с действием
 */
interface IMenuLink {
  title: string
  to?: string 
  icon?: string 
  action?: string
}
const mainstore = useMainstore()

/**
 * Определяем функции для пунктов меню, если они соотвествуют предоставленным функциям в интерфейсе стора.
 */
const transformedMenu = computed(() => props.menuprop.map(item => {
  return {
    action: item.action && mainstore.getAction(item.action) ? mainstore.getAction(item.action) : null,
    to: item.to ? item.to : null,
    title: item.title,
    icon: item.icon
  }
}))


const props = defineProps({
  menuprop: {
    type: Array<IMenuLink>,
    required: true,
  },
})



</script>
