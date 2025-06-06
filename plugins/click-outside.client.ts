export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", {
    beforeMount(el: HTMLElement) {
      const handler = (event: MouseEvent) => {
        if (el !== event.target && !el.contains(event.target as Node)) {
          const mainstore = useMainstore()
          mainstore.closeMenu()
        }
      }
      document.addEventListener("click", handler)

      el._unhandler = handler
    },
    unmounted(el: HTMLElement) {
      if (el._unhandler) {
        document.removeEventListener("click", el._unhandler)
        delete el._unhandler
      }
    }
  })
})
