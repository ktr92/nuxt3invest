<template>
  <div class="w-full my-8">
    <h2 class="font-medium text-lg text-gray-600">
      {{ title }}
    </h2>
    <ChartFilter @changePeriod="changePeriod" :firstDate="firstDate" />
    <div v-if="candles && status === 'success'">
      <!--  <div v-if="chartData && chartData.length"> -->
      <ChartTypeLine
        :data="candles"
        :uniqueId="uniqueId"
        :width="width"
        :units="units"
      />
      <!-- </div> -->
    </div>
    <div v-else>
      <ChartSkeleton />
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * компонент для вывода графика с фильтром
 */
const props = defineProps({
  units: {
    type: String,
    default: "",
  },
  dataHandler: {
    type: Function as PropType<TransformerDataLine>,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  loadData: {
    type: Array<IPositionView>,
    required: true,
  },
  width: {
    type: Number,
    default: 600,
  },
  
})
// для каждого графика на страницу нужен уникальный идентификатор
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
    ...props.loadData.map((item: IPositionView) => {
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
    // преобразуем ответ сервера в данные пригодные для построения графика
    transform: (candles): LineData[] => {
      const candlesToLine = {
        loadData: props.loadData, // данные из портфеля
        candles: candles, // данные с ценами по инструменту из ответа сервера
        from: from.value, //левая граница диапазона дат
        shares: shares.value, // информация об инструменте (нужно для сопоставления идентификатора инструмента в системе)
        instrumentId: instrumentId.value, // упорядоченный список идентификаторов инструменов
        alltime: alltime.value // флаг от которого зависит как строить график - от левой границы фильтра или с момента первой сделки по этому инструменту
      }

      return props.dataHandler(candlesToLine)
    },
  }
)
</script>
<style lang="scss" scoped></style>
