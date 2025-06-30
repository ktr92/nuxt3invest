<template>
  <div class="w-full">
    <h2 class="text-[hsla(147, 70%, 88%, 0.8)]">text</h2>
    <div v-if="status === 'success'">
           <div v-if="chartData && chartData.length">
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
// показывать график с момента покупки (false) или за весь выбранный период (true)
const alltime = ref(false)
// выбор периода дат
const from = new Date()
from.setFullYear(from.getFullYear() - 1)
/* from.setMonth(from.getMonth() - 1) */
const to = new Date()

const instrumentId = ref<Array<{ id: string }>>([])

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
            from: from.toISOString(),
            to: to.toISOString(),
            interval: "CANDLE_INTERVAL_DAY",
          },
          method: "POST",
        })
      }),
    ])
  },
  {
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
          id: instrumentId.value[index].id
        }
      })
    }
  }
)
/* console.log('candles :', candles.value)
 */// на основе полученных свечек формируем данные для графика - нам нужны даты с ценой, идентификатор (тикер) и дата открытия позиции.
const chartData = computed(() => {
  return candles.value?.map((item: LineData, index:number) => {

    const ticker = shares.value.filter(
      (share: any) => share[0].figi === item.id
    )[0][0].ticker
    return {
      dates: item.dates,
      id: ticker,
      opendate: alltime.value
        ? from.toISOString()
        : loadData.filter((share: any) => share.ticker === ticker)[0].openDate,
    }
  })
})

console.log("chartData :", chartData.value)
</script>
