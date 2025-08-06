<template>
  <div>
    <div class="flex justify-start gap-4 my-4">
      <div class="w-auto">
        <ClientOnly>
          <Datepicker
            v-model="datesFilter"
            range
            auto-apply
            :enable-time-picker="false"
            placeholder="Выберите даты"
            locale="ru"
            cancelText="Отмена"
            selectText="Выбрать"            
            clearable  
            format="dd.MM.yyyy"    
            no-today
            :markers="markers" 
            
          />
        </ClientOnly>
      </div>

      <UISelect v-model="typeFilter" :items="dealType" />

      <UIInput v-model="nameFilter" type="text" placeholder="Найти..." />
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
import {addDays} from 'date-fns/addDays';

const dealType = [
  {
    id: "all",
    name: "Все операции",
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

const typeFilter = ref("")
const nameFilter = ref("")
const datesFilter = ref()
const markers = ref()


onMounted(() => {

  markers.value =[
  {
    date: addDays(new Date(), 1),
    type: 'dot',
     color: 'red',
    tooltip: [{ text: '3 продажи', color: 'green' }],
  },
  {
    date: addDays(new Date(), 2),
    type: 'line',
    color: 'orange',
    tooltip: [
      { text: '1 продажа', color: 'red' },
      { text: '2 покупки', color: 'green' },
    ],
  },
  {
    date: addDays(new Date(), 3),
    type: 'dot',
    color: 'green',
     tooltip: [{ text: '1 покупка', color: 'green' }],
  },
]

  watchEffect(() => {
 
    // запрос на фильтрацию
  })
})
</script>

<style scoped></style>
