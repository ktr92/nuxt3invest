<template>
  <div class="">
    <label class="text-sm font-medium text-gray-700" for="" v-if="labeltext">
      {{ labeltext }}
    </label>
    <input
      :type="props.type"
      :name="props.name"
      :data-testid="props.name"
      :value="inputValue"
      :placeholder="props.placeholder"
      :disabled='props.disabled'
      @input="(event) => onChange(event)"
      @keyup.enter="onEnter"
      @blur="handleBlur"
      autocomplete='off'
        class="mt-0.5 w-full border border-slate-200 shadow-sm sm:text-sm p-2 focus:border-blue-700 outline-0 rounded-md"
    />
    <span v-if="errorMessage && meta.touched" class="text-red-700 text-sm">{{
      errorMessage
    }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate"
const emits = defineEmits(["update:modelValue", "onEnter"])
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    default: "",
  },
  errors: {
    type: String,
    required: false,
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

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.modelValue,
  valueProp: props.modelValue,
})

const onEnter = () => {
  emits("onEnter")
}

const onChange = (event: Event) => {
  handleChange(event, true)
  emits("update:modelValue", (<HTMLTextAreaElement>event.target).value)
}

const valueProp = computed(() => props.modelValue)
watchEffect(() => {
  inputValue.value = valueProp.value
})
</script>
