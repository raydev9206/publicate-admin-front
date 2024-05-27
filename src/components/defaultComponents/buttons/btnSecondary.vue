<template>
  <q-btn :label="label" :color="color" :disable="disable" :outline="outline" :icon="icon" :round="round"
    :rounded="rounded" :size="size" @click="$emit('onClickBtn')">
    <tooltipCmp v-if="tooltip" :text="tooltip" />
  </q-btn>
</template>

<script setup lang="ts">
import tooltipCmp from '../tooltip/tooltip.vue';

const props = defineProps({
  label: {
    type: String,
    default: "Cancel"
  },
  color: {
    type: String,
    default: 'ap-secondary'
  },
  tooltip: {
    type: String,
    default: null
  },
  disable: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String
  },
  outline: {
    type: Boolean,
    default: false
  },
  tagLang: {
    type: String,
    default: ""
  },
  round: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: ''
  }
});

const emit = defineEmits<{
  (e: 'onClickBtn'): void
}>()
</script>
