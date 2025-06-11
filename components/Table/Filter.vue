<template>
  <div>
    <div class="flex justify-start gap-4 my-4">
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

  watch(typeFilter, (newSelectType, oldSelectType) => {
    console.log(newSelectType)
  })
    

</script>

<style scoped></style>
