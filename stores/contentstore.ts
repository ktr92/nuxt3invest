import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useContentStore = defineStore("contentstore", () => {
  // STATE
  const loadData = ref<IPortfolio[]>([])
  const currentPortfolio = ref<IPortfolioData[]>([])
  const shareslist = ref<APIShare[]>([])

  // GETTERS
  const getUserContent = () => computed(() => loadData)
  const getUserPortfolio = (payload: string) => {
    return loadData.value.filter((item) => item.id === payload)[0]
  }
  const getChartData = () => {
    return currentPortfolio.value
  }


  // ACTIONS
  const setUserContent = (payload: IPortfolio[]) => {
    if (payload && payload.length) {
      loadData.value = payload
    }
  }

  const setChartData = (payload: IPortfolioData[]) => {
    if (payload) {
      currentPortfolio.value = payload
    }
  }



  return {
    getUserContent,
    getUserPortfolio,
    getChartData,
    setUserContent,
    setChartData,
  }
})
