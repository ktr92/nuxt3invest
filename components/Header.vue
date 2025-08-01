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
              <li>
                <a
                  @click.prevent.stop="mainstore.toggleModal()"
                  href="#"
                  class="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <title>Add-Stroke</title>
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g id="Add-Stroke">
                        <rect
                          id="Rectangle"
                          fill-rule="nonzero"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        ></rect>
                        <circle
                          id="Oval"
                          stroke="#0C0310"
                          stroke-width="2"
                          stroke-linecap="round"
                          cx="12"
                          cy="12"
                          r="9"
                        ></circle>
                        <line
                          x1="12"
                          y1="9"
                          x2="12"
                          y2="15"
                          id="Path"
                          stroke="#0C0310"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></line>
                        <line
                          x1="9"
                          y1="12"
                          x2="15"
                          y2="12"
                          id="Path"
                          stroke="#0C0310"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></line>
                      </g>
                    </g>
                  </svg>

                  <span
                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                  >
                    Новая&nbsp;сделка
                  </span>
                </a>
              </li>

              <li>
                <NuxtLink
                  to="/table/"
                  class="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <title>Analytics</title>
                    <g
                      id="Analytics"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-dasharray="0,0"
                      stroke-linecap="round"
                    >
                      <path
                        d="M4,18.9999905 L7.75407946,11.491832 C7.8680565,11.2638231 8.06482016,11.0879651 8.30413884,11.0001847 C9.11356935,10.7032911 9.60000359,10.8000012 9.76344156,11.2903152 L11.1190224,15.3570574 C11.1996482,15.5988744 11.3695623,15.8007859 11.5940587,15.9215227 C12.3533352,16.3298705 12.8485386,16.3029137 13.079669,15.8406525 L18,5.99999082 M13,6.46409237 L17.2774408,5.31795559 C17.4347269,5.27579637 17.5999292,5.27269863 17.7586883,5.30891799 C18.3183612,5.43660193 18.6397719,5.65560146 18.7229204,5.96591657 L19.9282036,10.4640923"
                        id="Vector"
                        stroke="#030819"
                        stroke-width="2"
                      ></path>
                    </g>
                  </svg>

                  <span
                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                  >
                    Позиции
                  </span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/deals/"
                  class="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <title>Browser</title>
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g id="Browser">
                        <rect
                          id="Rectangle"
                          fill-rule="nonzero"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        ></rect>
                        <rect
                          id="Rectangle"
                          stroke="#0C0310"
                          stroke-width="2"
                          stroke-linecap="round"
                          x="3"
                          y="4"
                          width="18"
                          height="16"
                          rx="2"
                        ></rect>
                        <line
                          x1="6"
                          y1="7"
                          x2="6.05"
                          y2="7"
                          id="Path"
                          stroke="#0C0310"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></line>
                        <line
                          x1="9"
                          y1="7"
                          x2="9.05"
                          y2="7"
                          id="Path"
                          stroke="#0C0310"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></line>
                        <line
                          x1="12"
                          y1="7"
                          x2="12.05"
                          y2="7"
                          id="Path"
                          stroke="#0C0310"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></line>
                        <line
                          x1="3"
                          y1="10"
                          x2="21"
                          y2="10"
                          id="Path"
                          stroke="#0C0310"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></line>
                      </g>
                    </g>
                  </svg>

                  <span
                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                  >
                    Журнал&nbsp;действий
                  </span>
                </NuxtLink>
              </li>

              <li>
                <NuxtLink
                  to="/"
                  class="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <title>Stats</title>
                    <g
                      id="Stats"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect
                        id="Container"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      ></rect>
                      <path
                        d="M6,4 L18,4 C19.1045695,4 20,4.8954305 20,6 L20,18 C20,19.1045695 19.1045695,20 18,20 L6,20 C4.8954305,20 4,19.1045695 4,18 L4,6 C4,4.8954305 4.8954305,4 6,4 Z"
                        id="shape-1"
                        stroke="#030819"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-dasharray="0,0"
                      ></path>
                      <line
                        x1="7.99991122"
                        y1="17"
                        x2="8"
                        y2="11"
                        id="shape-2"
                        stroke="#030819"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-dasharray="0,0"
                      ></line>
                      <line
                        x1="11.9999112"
                        y1="17"
                        x2="12"
                        y2="8"
                        id="shape-3"
                        stroke="#030819"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-dasharray="0,0"
                      ></line>
                      <line
                        x1="15.9999112"
                        y1="17"
                        x2="16"
                        y2="14"
                        id="shape-4"
                        stroke="#030819"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-dasharray="0,0"
                      ></line>
                    </g>
                  </svg>

                  <span
                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                  >
                    Аналитика
                  </span>
                </NuxtLink>
              </li>

            
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
                Посмотреть все
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
import appcontent from '@/services/apidata/mock'
const mainstore = useMainstore()
const ismenushown = computed(() => mainstore.getMenu())
const showMenu = (): void => {
  mainstore.toggleMenu()
}
const portfolio = appcontent.getPortfolio()
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
