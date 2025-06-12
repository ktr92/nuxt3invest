<template>
  <div>
    <div class="flex justify-start gap-4 my-4">

      <VDatePicker v-model="datesFilter" :attributes="attrs" />


       <UISelect
        v-model="typeFilter"
        :items="dealType"
      />

      <UIInput
        v-model="nameFilter"
        type="text"
        placeholder="Найти..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">


  const dealType = [
    {
      id: 'all',
      name: 'Все операции'
    },
    {
      id: 'sell',
      name: 'Продажи'
    },
    {
      id: 'buy',
      name: 'Покупки'
    },
  ]

  const typeFilter = ref('')
  const nameFilter = ref('')
  const datesFilter =  ref(new Date())

  watchEffect(() => {
    console.log(typeFilter.value)
    console.log(nameFilter.value)
    // запрос на фильтрацию 
  })
    
   const attrs = ref([
    {
      key: 'today',
      highlight: {
        color: 'green',
        fillMode: 'solid'
      },
      dates: new Date()
    }
  ])

</script>

<style scoped></style>
