<template>
  <div>
    <label for="Headline">
      <span class="text-sm font-medium text-gray-700" v-if="labeltext"> {{ labeltext }} </span>
  
      <select
        name="Headline"
        id="Headline"
        class="m-0 w-full border border-[#ddd] sm:text-sm p-2 outline-0 rounded-md cursor-pointer"
        @change="onChange"
      >
        <option :value="item.id" v-for="item in items" class="cursor-pointer">{{item.name}}</option>
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
    type: Array<IPortfolioDeal>,
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
  emits("update:modelValue", props.items[0].id)
})
</script>

<style scoped>

</style>