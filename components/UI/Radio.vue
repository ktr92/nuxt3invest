<template>
  <div>
    <ClientOnly>
      <label
        :for="`${range.id}-${uniqueId}`"
        class="flex items-center justify-between gap-4 rounded border bg-white border-transparent p-1 text-xs font-medium transition-colors hover:bg-gray-100 has-checked:border-blue-700 has-checked:ring-1 has-checked:ring-blue-700 cursor-pointer"
      >
        <p class="text-gray-700">{{ range.name }}</p>

        <input
          @change="(event: Event) => onChange(event)"
          v-model="selectedRange"
          type="radio"
          :name="`datesRange-${unique}`"
          :value="range.id"
          :id="`${range.id}-${uniqueId}`"
          class="sr-only"
        />
      </label>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">

type TNameId = {
  name: string
  id: string
}
const props = defineProps({
  range: {
    type: Object as PropType<TNameId>,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  unique: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(["update:modelValue"])

const selectedRange = ref("1y")

const uniqueId = ref("")

onMounted(() => {
  uniqueId.value = createUniqueId()
})

const onChange = (event: Event) => {
  emit("update:modelValue", (<HTMLInputElement>event.target).value)
}
</script>
