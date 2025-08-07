import { createError } from "h3"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  try {
    const body = await readBody(event)

    const response = await $fetch(
      `${config.APIURL}/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.APITOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body,
      }
    )

    return response.candles
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Error fetching data: ${error.message}`,
      })
    }
    throw createError({ statusCode: 500, statusMessage: "Unknown error" })
  }
})

/* 
{
  "candles": [
    {
      "open": {
        "units": "458",
        "nano": 0
      },
      "high": {
        "units": "459",
        "nano": 350000000
      },
      "low": {
        "units": "435",
        "nano": 950000000
      },
      "close": {
        "units": "440",
        "nano": 0
      },
      "volume": "17255969",
      "time": "2025-06-23T00:00:00Z",
      "isComplete": true,
      "candleSource": "CANDLE_SOURCE_EXCHANGE"
    },
    {
      "open": {
        "units": "436",
        "nano": 0
      },
      "high": {
        "units": "438",
        "nano": 700000000
      },
      "low": {
        "units": "427",
        "nano": 300000000
      },
      "close": {
        "units": "436",
        "nano": 800000000
      },
      "volume": "11286256",
      "time": "2025-06-24T00:00:00Z",
      "isComplete": true,
      "candleSource": "CANDLE_SOURCE_EXCHANGE"
    },
    {
      "open": {
        "units": "436",
        "nano": 800000000
      },
      "high": {
        "units": "440",
        "nano": 550000000
      },
      "low": {
        "units": "433",
        "nano": 700000000
      },
      "close": {
        "units": "435",
        "nano": 50000000
      },
      "volume": "4190573",
      "time": "2025-06-25T00:00:00Z",
      "isComplete": true,
      "candleSource": "CANDLE_SOURCE_EXCHANGE"
    },
    {
      "open": {
        "units": "436",
        "nano": 400000000
      },
      "high": {
        "units": "436",
        "nano": 750000000
      },
      "low": {
        "units": "433",
        "nano": 50000000
      },
      "close": {
        "units": "435",
        "nano": 150000000
      },
      "volume": "2601988",
      "time": "2025-06-26T00:00:00Z",
      "isComplete": true,
      "candleSource": "CANDLE_SOURCE_EXCHANGE"
    },
    {
      "open": {
        "units": "435",
        "nano": 500000000
      },
      "high": {
        "units": "439",
        "nano": 450000000
      },
      "low": {
        "units": "433",
        "nano": 50000000
      },
      "close": {
        "units": "438",
        "nano": 750000000
      },
      "volume": "4290864",
      "time": "2025-06-27T00:00:00Z",
      "isComplete": true,
      "candleSource": "CANDLE_SOURCE_EXCHANGE"
    },
    {
      "open": {
        "units": "439",
        "nano": 400000000
      },
      "high": {
        "units": "441",
        "nano": 400000000
      },
      "low": {
        "units": "439",
        "nano": 150000000
      },
      "close": {
        "units": "440",
        "nano": 800000000
      },
      "volume": "297008",
      "time": "2025-06-28T00:00:00Z",
      "isComplete": false,
      "candleSource": "CANDLE_SOURCE_EXCHANGE"
    }
  ]
}
  */
