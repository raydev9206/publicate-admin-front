<template>
  <div class=container-filters>
      <div class="top-class">
          <div class="full-width row wrap justify-end items-center content-start">
              <CloseIcon class="cursor-pointer" @click="$emit('close')" />
          </div>
          <div class="full-width row wrap justify-start items-center content-start">
              <p class="text-20-semibold">Filters</p>
          </div>
      </div>
      <div class="options-class">
          <slot name="content"/>
      </div>
      <div class="container-buttons buttons-class">
          <btnPrimary text-color="secondary" class="q-mt-lg nunito_regular" height btn-filter label="Apply"
              @onClickBtn="$emit('apply')" :loading="loading" />
          <btnPrimary text-color="secondary" class="q-mt-lg nunito_regular" color="" height btn-filter border
              label="Restore" @onClickBtn="$emit('restore')"/>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import btnPrimary from '/src/components/defaultComponents/buttons/btnPrimary.vue'
import CloseIcon from '/src/assets/icons/CloseIcon.vue'

const loading = ref(false)
</script>

<style scoped>
.container-filters {
  background: #fff;
  border-radius: 8px;
  border: 1px 0px 0px 0px;
  padding: 16px 16px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  filter: drop-shadow(0 2px 8px rgb(16 25 32/0.16));
  position: absolute;
  right: 0;
  top: 0;
  z-index: 6000;
}

.top-class {
  padding: 0px 0px 0px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.options-class {
  padding: 0px 32px 0px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buttons-class {
  padding: 0px 24px 0px 24px;
  width: 496px;
  gap: 16px;
}
</style>
