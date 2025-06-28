export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  try {
    const body = await readBody(event)

    const response = await $fetch(
      `${config.APIURL}/tinkoff.public.invest.api.contract.v1.InstrumentsService/Shares`,
      {
        body: {
          instrument_status: "INSTRUMENT_STATUS_BASE",
          instrument_exchange: "INSTRUMENT_EXCHANGE_UNSPECIFIED",
        },
        method: "post",
        headers: {
          Authorization: `Bearer ${config.APITOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )

    return response.instruments.filter(item => body.list.includes(item.isin))
  } catch (error) {
    console.error("Error fetching instrumentId:", error)
    return null
  }
})
