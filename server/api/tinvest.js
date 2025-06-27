import { H3Event } from "h3"
import { createError } from "h3"

export default defineEventHandler(async (event) => {
  const token = process.env.TBTOKEN

  if (!token) {
    throw createError({
      statusCode: 500,
      statusMessage: "TBTOKEN environment variable not set",
    })
  }

  try {
    const body = await readBody(event)
    const response = await fetch(
      "https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw createError({
        statusCode: response.status,
        statusMessage: `API error: ${response.status} ${
          errorData?.message || ""
        }`,
      })
    }

    return await response.json()
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
