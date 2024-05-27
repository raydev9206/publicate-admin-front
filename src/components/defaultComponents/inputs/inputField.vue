<template>
  <div class="">
    <div class="row q-my-sm">
      <div class="q-px-xs text-ap-primary nunito_bold" style="font-size: 14px; line-height: 19.1px;">{{ label }}</div>
      <img v-if="required" src="/icons/Aster.svg" />
    </div>
    <q-input :ref="nameRef" :class="classField" :standout="disable" :outlined="!disable" :type="type" color="primary"
      :model-value="inputValue" :mask="mask" :disable="disable" :required="required" dense :rules="rules" lazy-rules
      :readonly="readonly" :autogrow="autogrow" :placeholder="placeholder" :bg-color="disable ? 'grey-5' : 'white'"
      @update:modelValue="(newValue: any) => updateModel(newValue)" :error="isInvalid" :error-message="errorMessage">
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ValidationRule } from 'quasar';
import { toRef } from 'vue';
type InputType = 'number' | 'text' | 'date' | 'time' | 'email' | 'textarea' | 'password' | 'search' | 'tel' | 'file' | 'url' | 'datetime-local';
const props = defineProps({
  type: {
    type: String as () => InputType,
  },
  nameRef: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  disable: {
    type: Boolean,
    default: false
  },
  isInvalidProp: {
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
  errorMessage: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  rules: {
    type: Array as () => Array<ValidationRule>,
    default: () => [],
  },
  mask: {
    type: String,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  autogrow: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
  },
})
const inputValue = toRef(props, 'modelValue')
const isInvalid = toRef(props, 'isInvalidProp')

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'validate'): void
}>()


function updateModel(value: string) {
  emit('update:modelValue', value)
  emit('validate')
}
</script>
