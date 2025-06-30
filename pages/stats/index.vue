<template>
  <div class="w-full my-8">
    <h2 class="font-medium text-lg text-gray-600">Доходность позиций</h2>
    <div v-if="status === 'success'">
      <div v-if="chartData && chartData.length">
        <ChartFilter @changePeriod="changePeriod" />
        <ChartLine :data="chartData" />
      </div>
    </div>
    <div v-else>
      <ChartSkeleton />
    </div>
  </div>
</template>

<script setup lang="ts">
// информация о портфеле грузится из БД
const loadData = [
  {
    ticker: "ROSN",
    isin: "RU000A0J2Q06",
    name: "Роснефть",
    count: 12323,
    price: 420,
    newprice: 380,
    pricechange: -40,
    total: 500,
    change: -6,
    yearchange: 11,
    openDate: "2024-03-02",
    share: 30,
  },
  {
    ticker: "ASTR",
    isin: "RU000A106T36",
    name: "Астра",
    count: 33213,
    price: 545,
    newprice: 567,
    pricechange: 22,
    total: 500,
    change: 10,
    yearchange: -20,
    openDate: "2024-12-02",

    share: 25,
  },
  {
    ticker: "SBER",
    isin: "RU0009029540",
    name: "Сбербанк",
    count: 300,
    price: 255,
    newprice: 567,
    pricechange: 22,
    total: 500,
    change: 10,
    openDate: "2024-11-02",
    share: 25,
  },
]

const datesRange = [
  {
    id: "allTime",
    name: "все",
  },
  {
    id: "sell",
    name: "Продажи",
  },
  {
    id: "buy",
    name: "Покупки",
  },
]

// показывать график с момента покупки (false) или за весь выбранный период (true)
const alltime = ref(false)
// выбор периода дат
const from = ref(new Date())
from.value.setFullYear(from.value.getFullYear() - 1)
/* from.setMonth(from.getMonth() - 1) */
const to = ref(new Date())

const instrumentId = ref<Array<{ id: string }>>([])

// фильтрация
const changePeriod = (paramFrom: Date, paramTo: Date) => {
  console.log('param: ', paramFrom, paramTo)
  from.value = paramFrom
  to.value = paramTo
}

// находим информацию по нашим акциям. Для дальнейшей реботы нужнен идентификатор FIGI который кроме как через api нигде не найти.
const { data: shares } = await useAsyncData("instruments", () => {
  return Promise.all([
    ...loadData.map((item) => {
      return $fetch("/api/tinsrumentid", {
        body: {
          isin: item.isin,
        },
        method: "POST",
      })
    }),
  ])
})
/*  console.log('shares :', shares.value)
 */

// получаем данные для свечек за выбранный период
const { data: candles, status } = await useLazyAsyncData(
  "candles",
  () => {
    return Promise.all([
      ...shares.value.map((item: any) => {
        instrumentId.value.push({
          id: item[0].figi,
        })
        return $fetch("/api/t_candles", {
          body: {
            instrumentId: item[0].figi,
            from: from.value.toISOString(),
            to: to.value.toISOString(),
            interval: "CANDLE_INTERVAL_DAY",
          },
          method: "POST",
        })
      }),
    ])
  },
  {
    watch: [from, to],
    transform: (candles) => {
      // обработка каждого из рельзутатов promise.all
      return candles.map((res: any, index: number) => {
        return {
          dates: res.map((item: any) => {
            const open = `${item.open.units}.${item.open.nano}`
            const close = `${item.close.units}.${item.close.nano}`
            const change = ((Number(close) - Number(open)) / Number(open)) * 100

            return {
              value: Number(close),
              date: item.time,
            }
          }),
          id: instrumentId.value[index].id,
        }
      })
    },
  }
)
/* console.log('candles :', candles.value)
 */ // на основе полученных свечек формируем данные для графика - нам нужны даты с ценой, идентификатор (тикер) и дата открытия позиции.
const chartData = computed(() => {
  return candles.value?.map((item: LineData, index: number) => {
    const ticker = shares.value.filter(
      (share: any) => share[0].figi === item.id
    )[0][0].ticker
    return {
      dates: item.dates,
      id: ticker,
      opendate: alltime.value
        ? from.value.toISOString()
        : loadData.filter((share: any) => share.ticker === ticker)[0].openDate,
    }
  })
})

console.log("chartData :", chartData.value)
</script>
