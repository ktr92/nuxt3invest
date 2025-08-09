<template>
  <div>
    <div class="flex justify-start gap-4 my-4">
      <div>
        <fieldset class="space-y-3 flex gap-2 overflow-auto max-w-full" v-once>
          <div v-for="range in datesRange" :key="`${range.id}-${uniqueId}`">
            <UIRadio v-model="selectedRange" :range="range" :uniqueprop="uniqueId"/>
          </div>
        </fieldset>
      </div>
      <div class="w-auto" v-if="selectedRange === 'custom'">
        <ClientOnly>
          <Datepicker
            v-model="datesFilter"
            range
            auto-apply
            :enable-time-picker="false"
            placeholder="Выбрать даты"
            locale="ru"
            cancelText="Отмена"
            selectText="Выбрать"
            clearable
            format="dd.MM.yyyy"
            no-today
            classes=""
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const props = defineProps({
  firstDate: {
    type: Date,
    default: new Date(),
  },
})

const datesRange = [
  {
    id: "alltime",
    name: "за все время",
  },
  {
    id: "ytd",
    name: "с начала года",
  },
  {
    id: "1y",
    name: "1 год",
  },
  {
    id: "6m",
    name: "полгода",
  },
  {
    id: "3m",
    name: "3 месяца",
  },
  {
    id: "1m",
    name: "1 месяц",
  },
  {
    id: "1w",
    name: "1 неделя",
  },
  /*  {
    id: "1d",
    name: "1 день",
  }, */
  {
    id: "custom",
    name: "другой период",
  },
]
const emit = defineEmits(["changePeriod"])

const datesFilter = ref()
const selectedRange = ref("1y")



// label и input должны быть уникальными, иначе фильтр будет работать на всех графиках каждого компонента
const uniqueId = createUniqueId() 

watchEffect(() => {
  if (datesFilter.value && datesFilter.value.length === 2) {
    changePeriod()
  }
})

const changePeriod = () => {
  let fromFilter = new Date()
  let toFilter = new Date()
  if (selectedRange.value === "custom") {
    // данные из календаря
    if (datesFilter.value && datesFilter.value.length === 2) {
      fromFilter = datesFilter.value[0]
      toFilter = datesFilter.value[1]
      emit("changePeriod", fromFilter, toFilter)
    }
  } else {
    datesFilter.value = null
    switch (selectedRange.value) {
      case "1y":
        fromFilter.setFullYear(fromFilter.getFullYear() - 1)
        break
      case "1m":
        fromFilter.setMonth(fromFilter.getMonth() - 1)
        break
      case "3m":
        fromFilter.setMonth(fromFilter.getMonth() - 3)
        break
      case "6m":
        fromFilter.setMonth(fromFilter.getMonth() - 6)
        break
      case "ytd":
        fromFilter = new Date(fromFilter.getFullYear(), 0, 1)
        break
      case "1w":
        fromFilter.setDate(fromFilter.getDate() - 7)
        break
      case "custom":
        fromFilter.setDate(fromFilter.getDate() - 7)
        break
      case "alltime":
        fromFilter = props.firstDate
        break
      /*  case "1d":
        fromFilter.setHours(fromFilter.getHours() - 24)
        break; */
      /*   default: 
        fromFilter.setFullYear(fromFilter.getFullYear() - 1);
        break; */
    }

    emit("changePeriod", fromFilter, toFilter)
  }
}

watchEffect(() => {
 if (selectedRange.value) {
    changePeriod()
 }
})
</script>

<style scoped>
.dp__main :deep(*) {
  --dp-input-padding: 0 !important;
  --dp-font-size: 14px;
  --dp-input-icon-padding: 28px;
}
.dp__main :deep(.dp__input_icons) {
  padding-left: 6px;
  padding-right: 6px;
}
.dp__main :deep(.dp__input) {
  padding-right: 10px;
}
</style>
