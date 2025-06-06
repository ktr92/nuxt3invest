<template>
  <div>
    <label for="Headline">
      <span class="text-sm font-medium text-gray-700" v-if="labeltext"> {{ labeltext }} </span>
  
      <select
        name="Headline"
        id="Headline"
        class="mt-0.5 w-full border border-slate-200 shadow-sm sm:text-sm p-2 focus:border-blue-700 outline-0 rounded-md"
        @change="onChange"
      >
        <option :value="item" v-for="item in items">{{item}}</option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    required: false
  },
  labeltext: {
    type: String,
    required: false
  }
})

const emits = defineEmits(["update:modelValue"])
const onChange = (event: Event) => {
  emits("update:modelValue", (<HTMLSelectElement>event.target).value)
}
onMounted(() => {
  emits("update:modelValue", props.items[0])
})
</script>

<style scoped>

</style>