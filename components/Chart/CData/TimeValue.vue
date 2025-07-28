<template>
  <div class="w-full my-8">
    <h2 class="font-medium text-lg text-gray-600">
      {{ title }}
    </h2>

    <ChartFilter @changePeriod="changePeriod" :firstDate="firstDate" />
    <div v-if="status === 'success'">
      <!--  <div v-if="chartData && chartData.length"> -->
      <ChartTypeLine :data="candles" :uniqueId="uniqueId" :width="width" :units="units" />
      <!-- </div> -->
    </div>
    <div v-else>
      <ChartSkeleton />
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  units: {
    type: String,
    default: ''
  },
  dataHandler: {
    type: Function,
    default: (candles: any) => candles
  },
  title: {
    type: String,
    required: false
  },
  loadData: {
    type: Array<ILoadData>,
    required: true,
  },
  width: {
    type: Number,
    default: 600,
  },
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

// находим информацию по нашим акциям. Для дальнейшей работы нужнен идентификатор FIGI который кроме как через api нигде не найти.
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
      return props.dataHandler(candles, from.value, shares.value, instrumentId.value, alltime.value)
    },
  }
)
</script>
<style lang="scss" scoped></style>
