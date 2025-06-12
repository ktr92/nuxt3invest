<template>
  <div>
    <div class="flex justify-start gap-4 my-4">
      <div class="w-auto">
 <ClientOnly>
        <Datepicker
          v-model="datesFilter"
          :enable-time-picker="false"
          placeholder="Выберите дату"
          locale="ru"
          cancelText="Отмена"
          selectText="Выбрать"
          auto-apply
          clearable
          range
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

onMounted(() => {
   const startDate = new Date();
  const endDate = new Date();
  datesFilter.value = [startDate, endDate];

  watchEffect(() => {
    console.log(typeFilter.value)
    console.log(nameFilter.value)
    console.log(datesFilter.value)
    // запрос на фильтрацию
  })
})
</script>

<style scoped></style>
