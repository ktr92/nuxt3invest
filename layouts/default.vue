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
const ismodalshown = computed(() => mainstore.getModal)
</script>
