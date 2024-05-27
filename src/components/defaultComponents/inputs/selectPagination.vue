<template>
    <q-select :outlined="true" :options="options" color="secondary"
      bg-color='white' dense :model-value="valueInput" rounded
      @update:modelValue="(newValue: any) => updateModel(newValue)"/>
</template>

<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps({
  options: {
    type: Array<number>,
    default: []
  },
  modelValue: {
    type: Number,
    default: 0
  },
})

const valueInput = toRef(props, 'modelValue');
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function updateModel(value: number) {
  emit('update:modelValue', value)
}

</script>
