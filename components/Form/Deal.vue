<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-4 w-full">
      <UISwitcher
        :items="deallist"
        v-model="dealtype"
        :disabled="isLoading"
        inputheader="Тип сделки"
        inputid="dealtype"
      ></UISwitcher>
    </div>
    <div class="mb-4 w-full">
      <UISelect
        labeltext="Портфель"
        v-model="selectportfolio"
        :items="portfolioList"
      />
    </div>

    <div class="mb-4 w-full">
      <UIInput
        name="company"
        v-model="company"
        :disabled="isLoading"
        labeltext="Актив/Компания"
        placeholder="Начните вводить тикер или название компании..."
      ></UIInput>
    </div>
    <div class="mb-4 w-full flex gap-2">
      <UIInput
        name="count"
        v-model="count"
        :disabled="isLoading"
        labeltext="Количество"
      ></UIInput>
      <UIInput
        name="price"
        v-model="price"
        :disabled="isLoading"
        labeltext="Цена"
      ></UIInput>
    </div>
    <div class="mb-4 w-full">
      <UIInput
        name="comment"
        v-model="comment"
        :disabled="isLoading"
        labeltext="Примечание"
        placeholder="Начните вводить тикер или название компании..."
      ></UIInput>
    </div>
    <div class="mb-0 mt-8 w-full flex gap-2">
      <UIButton @click="onSubmit" :liquid="true"> Сохранить </UIButton>
      <UIButton @click="onCancel" :liquid="true" class="bg-gray-300"
        >Отменить</UIButton
      >

      <!-- <button type="submit" class="w-full">
              {{ logreg === "LOGIN" ? $t("login") : $t("register") }}
            </button> -->
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate"
import * as yup from "yup"

const mainstore = useMainstore()

const deallist = mainstore.getDealTypes
const dealtype = ref("")
const company = ref("")
const count = ref("")
const price = ref("")
const comment = ref("")
const selectportfolio = ref("")
const isLoading = ref(false)
const someError = ref("")

const portfolioList = mainstore.getBrokerslist

const schema = yup.object().shape({
  /* 
  company: yup.string().required(), */
})
const { handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const failValidation = () => {
  console.log("fail Validation")
}

const onCancel = () => {
  mainstore.closeModal()
}

const onSubmit = handleSubmit(async () => {
  try {
    isLoading.value = true
    someError.value = ""

    const formData = {
      dealtype: dealtype.value,
      selectportfolio: selectportfolio.value,
      company: company.value,
      price: price.value,
      count: count.value,
      comment: comment.value,
    }
    console.log(formData)
    const { data, error } = await useFetch("/api/auth/deal", {
      method: "POST",
      body: {
        company: company.value,
      },
    })

    if (error.value) {
      someError.value = error.value.message
    }

    if (data.value) {
      console.log("Deal success!")
      // сохранить в журнал сделок
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
