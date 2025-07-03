<template>
  <div class="w-full my-8">
    <h2 class="font-medium text-lg text-gray-600">
      Цена акций в портфеле с момента покупки
    </h2>

    <ChartFilter @changePeriod="changePeriod" :firstDate="firstDate" />
    <div v-if="status === 'success'">
     <!--  <div v-if="chartData && chartData.length"> -->
        <ChartTypeLine :data="chartData" :uniqueId="uniqueId" :width="width"/>
      <!-- </div> -->
    </div>
    <div v-else>
     <!--  <div class="w-64 h-64 m-auto flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
          <path
            fill="none"
            stroke="rgba(20, 71, 230, 0.7)"
            stroke-width="15"
            stroke-linecap="round"
            stroke-dasharray="300 385"
            stroke-dashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animate>
          </path>
        </svg>
      </div> -->
      <ChartSkeleton />
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  loadData: {
    type: Array<ILoadData>,
    required: true,
  },
  width: {
    type: Number,
    default: 600
  }
})

const uniqueId = createUniqueId()

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
  from.value = paramFrom
  to.value = paramTo
}

const firstDate = computed(() =>
  props.loadData
    .map((item) => new Date(item.openDate))
    .reduce((a, b) => (a < b ? a : b))
)

// находим информацию по нашим акциям. Для дальнейшей реботы нужнен идентификатор FIGI который кроме как через api нигде не найти.
const { data: shares } = await useAsyncData(`instruments-${uniqueId}`, () => {
  return Promise.all([
    ...props.loadData.map((item: ILoadData) => {
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
  `candles-${uniqueId}`,
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
    watch: [from],
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
      (share: APIShare[]) => share[0].figi === item.id
    )[0][0].ticker

    return {
      dates: item.dates,
      id: ticker,
      opendate: alltime.value
        ? from.value.toISOString()
        : props.loadData.filter(
            (share: ILoadData) => share.ticker === ticker
          )[0].openDate,
    }
  })
})
</script>
<style lang="scss" scoped></style>
