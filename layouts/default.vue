<template>
  <div>
    <div class="default">
      <div class="flex gap-8">
        <ClientOnly>
          <Header />
        </ClientOnly>

        <slot />
        
        <ClientOnly>
          <div>
            <Modal modal-title="Новая сделка" v-if="ismodalshown">
              <FormDeal />
            </Modal>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const mainstore = useMainstore()
const ismodalshown = computed(() => mainstore.getModal())
</script>


<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
  z-index: -999;
}

/* неактивное состояние */
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* активное состояние */
.slide-enter-to,
.slide-leave-from {
  left: 0;
  opacity: 1;
}
</style>
