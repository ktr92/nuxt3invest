<template>
  <div>
    <div class="flex gap-15 my-4">
       <UISelect
        v-model="selectType"
        :items="dealType"
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

  const selectType = ref('')

  watch(selectType, (newSelectType, oldSelectType) => {
    console.log(newSelectType)
  })
    

</script>

<style scoped></style>
