import appcontent from "~/services/apidata/mock"

export function useGetPortfolio() {
  const route = useRoute()
  const portfolioID = route.params.id as string
  const portfolio = computed(() => appcontent.getPortfolioById(portfolioID))
  
  return { portfolio}
}
