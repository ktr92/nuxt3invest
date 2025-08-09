import appcontent from "~/services/apidata/mock"

export function useGetPositions() {
  const route = useRoute()
  const portfolio_id = route.params.id as string
  const positions = computed(() => {
    // если в роуте есть id
    if (portfolio_id && portfolio_id.length) {
      // и если этот id имеется в портфелях
      const portfolio_data = appcontent.getPositionsById(portfolio_id)
      if (portfolio_data) {
        return portfolio_data
      }
    }
    // иначе возвращаем все портфели
    return appcontent.getTotalPositions()
  })
  return { positions }
}
