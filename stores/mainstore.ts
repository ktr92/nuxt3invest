import { defineStore } from "pinia"

export const useMainstore = defineStore("mainstore", () => {

  // STATE
  const ismenushown = ref(false)
  const ismodalshown = ref(false)
  // GETTERS

   const getMenu = () => ismenushown.value
   const getModal = () => ismodalshown.value

  // ACTIONS
     const toggleMenu= () => {
      ismenushown.value = !ismenushown.value
    }

    const toggleModal= () => {
      ismodalshown.value = !ismodalshown.value
    }

    const closeMenu= () => {
     ismenushown.value = false
    }

    const closeModal= () => {
      ismodalshown.value = false
    }

  return {
    getMenu, getModal, toggleModal, toggleMenu, closeMenu, closeModal
  }

})
