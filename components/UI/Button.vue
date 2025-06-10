<template>
  <span
    @click.prevent="onClick"
    :disabled="props.disabled"
    :class="classes"
    class="bg-blue-500 text-white rounded-md block text-white focus:ring-4 focus:outline-none font-medium px-5 py-4 text-md text-center cursor-pointer whitespace-nowrap min-w-[115px] md:min-w-[150px]"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
  },
  liquid: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "primary",
  },
 
})

const emits = defineEmits(["onclick"])


enum ButtonSizes {
  "xs" = "px-[10px] py-1 md:py-[6px]",
  "sm" = "px-[15px] py-1 md:py-[10px]",
  "md" = "px-2 md:px-3 py-[8px] md:py-3",
  "lg" = "px-2 md:px-12 py-[8px] md:py-3",
}

enum TextSizes {
  "xs" = "text-xs",
  "sm" = "text-sm",
  "md" = "text-sm md:text-md",
  "lg" = "text-md md:text-lg",
}

enum ButtonTypes {
  "primary" = "bg-primary-600  text-white dark:bg-primary-500 hover:bg-primary-300",
  "danger" = "bg-red-400  text-white dark:bg-red-400 hover:bg-red-600",
  "clear" = "bg-gray-500 dark:bg-gray-200  text-white dark:bg-gray-500 hover:bg-red-600",
}

const paddingClasses = computed(() => {
  return ButtonSizes[props.size as keyof typeof ButtonSizes]
})

const textClass = computed(() => {
  return TextSizes[props.size as keyof typeof ButtonSizes]
})
const typeClass = computed(() => {
  return ButtonTypes[props.type as keyof typeof ButtonTypes]
})
const widthClass = computed(() => {
  return props.liquid ? "w-full" : "w-min"
})
const roundedClass = computed(() => {
  return props.rounded ? "rounded-md" : ""
})

const classes = computed(
  () =>
    `${paddingClasses.value} ${textClass.value} ${widthClass.value} ${roundedClass.value} ${typeClass.value}`
)

const onClick = (event: Event) => {
  emits("onclick", event)
}
</script>
