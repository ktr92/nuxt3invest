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
            placeholder="Select dates"
            locale="ru"
            cancelText="Cancel"
            selectText="Select"            
            clearable  
            format="dd.MM.yyyy"    
            no-today
            :markers="markers" 
            
          />
        </ClientOnly>
      </div>

      <UISelect v-model="typeFilter" :items="dealType" />

      <UIInput v-model="nameFilter" type="text" placeholder="Search..." />
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
    name: "All operations",
  },
  {
    id: "sell",
    name: "Sell",
  },
  {
    id: "buy",
    name: "Buy",
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
    tooltip: [{ text: '3 sales', color: 'green' }],
  },
  {
    date: addDays(new Date(), 2),
    type: 'line',
    color: 'orange',
    tooltip: [
      { text: '1 sale', color: 'red' },
      { text: '2 purchase', color: 'green' },
    ],
  },
  {
    date: addDays(new Date(), 3),
    type: 'dot',
    color: 'green',
     tooltip: [{ text: '1 purchase', color: 'green' }],
  },
]

  watchEffect(() => {
 
    // запрос на фильтрацию
  })
})
</script>

<style scoped></style>
