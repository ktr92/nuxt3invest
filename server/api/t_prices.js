export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  try {
    const body = await readBody(event)
 
    const response = await $fetch(
      `${config.APIURL}/tinkoff.public.invest.api.contract.v1.MarketDataService/GetLastPrices`,
      {
        body: {
          lastPriceType: "LAST_PRICE_UNSPECIFIED",
          instrumentStatus: "INSTRUMENT_STATUS_UNSPECIFIED",
          ...body,
        },
        method: "post",
        headers: {
          Authorization: `Bearer ${config.APITOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    return response.lastPrices
  } catch (error) {
    console.error("Error fetching instrumentId:", error)
    return null
  }
})
