/**
 * Пользовательская директива - выполнить коллбек при клике вне элемента, к которому установлена директива.
 * Коллбек функция передается как значение в директиве через binding.value
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", {
    beforeMount(el: HTMLElement, binding: DirectiveBinding) {
      /** Обработчик нажатия вне элемента */
      const handler = (event: MouseEvent) => {
        if (el !== event.target && !el.contains(event.target as Node)) {
          if (typeof binding.value === 'function') {
           binding.value()
          }
        }
      }
      /** Добавляем обработчик к документу */
      document.addEventListener("click", handler)
      /** Сохраняем обработчик нажатия вне элемента, чтобы в дальнейшем иметь возможности удалить обработчик с документа */
      el._unhandler = handler
    },
    unmounted(el: HTMLElement) {
      if (el._unhandler) {
        document.removeEventListener("click", el._unhandler)
        delete el._unhandler
      }
    },
  })
})
