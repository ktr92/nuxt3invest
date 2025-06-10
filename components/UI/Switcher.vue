<template>
  <fieldset class="space-y-3">
    <legend class="sr-only">{{ inputheader }}</legend>
 
    <div class="flex wrap w-full gap-2">
    <div v-for="(item, index) in items" class="w-full">
      <label
        :for="item.id"
        class="text-center text-gray-700 flex items-center justify-center gap-4 rounded border bg-gray-50 border-gray-50  p-3 text-sm font-medium shadow-sm transition-colors hover:bg-blue-50 has-checked:border-blue-500 has-checked:ring-1 has-checked:bg-blue-50 has-checked:text-blue-500 cursor-pointer"
      >
        <p class="">{{item.title}}</p>

        <p class="" v-if="item.info && item.info.length">{{ item.info }}</p>

        <input
          type="radio"
          :name="inputid"
          :value="item.id"
          :id="item.id"
          class="sr-only"
          :checked="index === 0"
          @change="onChange"
        />
      </label>
    </div>
    </div><!-- /.flex -->

   
  </fieldset>
</template>

<script setup lang="ts">
const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  inputid: {
    type: String,
    required: true,
  },
  inputheader: {
    type: String,
    required: true,
  },
  items: {
    type: Array<ISwitcher>,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
  }
});

const onChange = (event: Event) => {
  emits("update:modelValue", (<HTMLInputElement>event.target).value)
}

onMounted(() => {
  emits("update:modelValue", props.items[0].id)

})
</script>

<style scoped></style>
