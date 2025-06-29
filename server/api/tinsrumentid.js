import { H3Event } from "h3"
import { createError } from "h3"



export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  try {
    const body = await readBody(event)
    const response = await $fetch(
      config.APIURL +
        "/tinkoff.public.invest.api.contract.v1.InstrumentsService/FindInstrument",
      {
        body: {
          query: body.isin,
          instrumentKind: "INSTRUMENT_TYPE_UNSPECIFIED",
          apiTradeAvailableFlag: true,
        },
        method: "post",
        headers: {
          Authorization: `Bearer ${config.APITOKEN}`, 
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )


    return response.instruments
  } catch (error) {
    console.error("Error fetching instrumentId:", error)
    return null
  }
})

/* const getIdbyTickers = async (tickers: Array<string>) => {
  async function getInstrumentIdByTicker(ticker: string) {
    try {
      
    } catch (error) {
     
    }
  }

  async function createTickerInstrumentIdMap(tickers) {
    const tickerInstrumentIdMap = {}
    for (const ticker of tickers) {
      const instrumentId = await getInstrumentIdByTicker(ticker)
      if (instrumentId) {
        tickerInstrumentIdMap[ticker] = instrumentId
      }
    }
    return tickerInstrumentIdMap
  }

  const tickerMap = await createTickerInstrumentIdMap(tickers)
  console.log(tickerMap)
  return tickerMap
} */
/* 
module.exports = { getIdbyTickers  }*/
