import { defineStore } from "pinia"

export const useMainstore = defineStore("mainstore", {
  state: () => ({
    ismenushown: false,
    ismodalshown: false,
    
  }),
  getters: {
    getMenu: (state) => state.ismenushown,
    getModal: (state) => state.ismodalshown,
   
  },
  actions: {
    toggleMenu() {
      this.ismenushown = !this.ismenushown
    },
    toggleModal() {
      this.ismodalshown = !this.ismodalshown
    },
    closeMenu() {
      this.ismenushown = false
    },
    closeModal() {
      this.ismodalshown = false
    }
  },
})
