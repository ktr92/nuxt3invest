<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-4 w-full">
      <UISelect labeltext="Портфель" v-model="selectportfolio" :items="items" />
    </div>
    <div class="mb-4 w-full">
      <UIInput
        name="email"
        v-model="company"
        :disabled="isLoading"
        labeltext="Актив/Компания"
        placeholder="Начните вводить тикер или название компании..."
      ></UIInput>
    </div>

    <div class="mb-0 mt-8 w-full flex gap-2">
      <UIButton @click="onSubmit" :liquid="true">
        Сохранить
      </UIButton>
      <UIButton @click="onCancel" :liquid="true" class="bg-gray-300 ">Отменить</UIButton>

      <!-- <button type="submit" class="w-full">
              {{ logreg === "LOGIN" ? $t("login") : $t("register") }}
            </button> -->
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate"
import * as yup from "yup"

const company = ref("")
const selectportfolio = ref("")
const isLoading = ref(false)
const someError = ref('')

const items = ['1', '2', '3']

const schema = yup.object().shape({
  company: yup
    .string()
    .required()
})
const { handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const failValidation = () => {
  console.log("fail Validation")
}

const onCancel = () => {
  // все сбросить и закрыть окно
}

const onSubmit = handleSubmit(async () => {
    try {
      isLoading.value = true
      someError.value = ''
      const { data, error } = await useFetch("/api/auth/deal", {
        method: "POST",
        body: {
          company: company.value
        },
      })

      if (error.value) {
        someError.value = error.value.message
      }

      if (data.value) {
        console.log("Deal success!")
        
      }
    } catch (err) {
      if (err instanceof Error) {
        someError.value = err.message
      }

    } finally {
      isLoading.value = false
    }
 
}, failValidation)
</script>

<style scoped></style>
