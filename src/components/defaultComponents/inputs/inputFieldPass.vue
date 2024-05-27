<template>
  <div>
    <div class="row q-my-sm">
      <div class="q-px-xs text-ap-primary nunito_bold" style="font-size: 14px; line-height: 19.1px;">{{ label }}</div>
      <img v-if="required" src="/icons/Aster.svg" />
    </div>
    <q-input :model-value="inputValue" :ref="nameRef" :class="classField" outlined color="primary" :mask="mask"
      :disable="disable" :required="required" dense :readonly="readonly" :autogrow="autogrow" :placeholder="placeholder"
      bg-color="white" @update:modelValue="(newValue: any) =>updateModel(newValue)" :error="isInvalid" :error-message="errorMessage"
      :type="isPwd ? 'password' : 'text'">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>
  </div>
</template>
<script setup lang="ts">
import { ref, toRef } from 'vue';

const isPwd = ref(true)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  type: {
    type: String,
  },
  nameRef: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  disable: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  classField: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
  },
  rules: {
    type: Array,
    default: () => { },
  },
  mask: {
    type: String,
  },
  errorMessage: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  isInvalidProp: {
    type: Boolean,
    default: false
  },
  autogrow: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
  },
})

const inputValue = toRef(props, 'modelValue');
const isInvalid = toRef(props, 'isInvalidProp')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'validate'): void
}>()

function updateModel(value: string) {
  emit('update:modelValue', value)
  emit('validate')
}
</script>
