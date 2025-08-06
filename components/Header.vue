<template>
  <div class="flex">
    <div
      class="flex h-screen w-16 flex-col justify-between border-e border-gray-100 bg-white z-5 relative"
    >
      <div>
        <MenuTop />
        <div class="border-t border-gray-100">
          <div class="px-2">
            <MenuMain @showMenu="showMenu" />
            <ul class="space-y-1 border-t border-gray-100 pt-4">
              <MenuPanel :menuprop="menupanel"/>
            </ul>
          </div>
        </div>
      </div>

      <MenuLogout />
    </div>

    <Transition name="slide">
      <div
        class="flex h-screen flex-1 flex-col justify-between border-e border-gray-100 bg-white fixed top-0 ml-[63px] z-4"
        v-if="ismenushown"
        v-click-outside="() => mainstore.closeMenu()"
      >
        <div class="px-4 py-6">
          <ul class="mt-14 space-y-1">
            <li>
              <NuxtLink
                to="/"
                class="block rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-500 hover:text-white"
              >
                Общее
              </NuxtLink>
            </li>

            <template v-for="item in portfolio" :key="item">
              <MenuPortfolio :portfolioname="item.name" />
            </template>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import appcontent from "@/services/apidata/mock"
const mainstore = useMainstore()
const ismenushown = computed(() => mainstore.getMenu())
const showMenu = (): void => {
  mainstore.toggleMenu()
}
const portfolio = appcontent.getPortfolio()

const menupanel = [
  {
    title: "Новая сделка",
    icon: "newdeal",
    action: mainstore.toggleModal,
  },
  {
    title: "Аналитика",
    to: "/table/",
    icon: "table",
  },

  {
    title: "Статистика",
    to: "/",
    icon: "stats",
  },
  {
    title: "Журнал действий",
    to: "/deals/",
    icon: "deals",
  },
]
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
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
