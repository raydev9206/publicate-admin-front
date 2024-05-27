<template>
  <div class="">
      <div class="row q-my-sm">
          <div class="q-px-xs text-ap-primary nunito_bold" style="font-size: 14px; line-height: 19.1px;">{{ label }}
          </div>
          <img v-if="required" src="/icons/Aster.svg" />
      </div>
      <q-select :multiple="multiple" map-options emit-value :outlined="!disable" :filled="disable"
          :model-value="valueInput" :options="options" option-label="name" use-input fill-input input-debounce="0"
          @filter="filterFn" :option-value="optionsValueLabel ? 'name' : 'id'" color="secondary" :disable="disable"
          :bg-color="disable ? 'grey-5' : 'white'" :required="required" dense
          :label="valueInput.length > 0 ? undefined : placeholder"
          @update:modelValue="(newValue: any) => updateModel(newValue)" :error="isInvalid"
          :error-message="errorMessage">
          <template v-slot:no-option>
              <q-item>
                  <q-item-section class="text-grey">
                      No results
                  </q-item-section>
              </q-item>
          </template>
      </q-select>
  </div>
</template>

<script setup lang="ts">
import { QSelect } from 'quasar';
import { toRef, ref, onUnmounted, /* Ref */ watch /* computed */ } from 'vue';

// const element = defineModel({ required: true, type: String })
const props = defineProps({
  options: { type: Array<{ name: string, id: string }>, default: [] },
  optionsValueLabel: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  nameRef: { type: String, default: '' },
  modelValue: { type: Array<string>, default: '' },
  disable: { type: Boolean, default: false },
  isInvalidProp: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  label: { type: String, default: '' },
  errorMessage: { type: String, default: '' },
  rules: { type: Array, default: () => { }, },
  readonly: { type: Boolean, default: false, },
  autogrow: { type: Boolean, default: false, },
  placeholder: { type: String, },
})

const options = ref(props.options.map(val => { return val }));
const valueInput = toRef(props, 'modelValue');
const isInvalid = toRef(props, 'isInvalidProp')
const selectAll = ref(valueInput.value.length === options.value.length)

watch(valueInput, () => {
  if (valueInput.value.length === options.value.length) {
      selectAll.value = true
  } else {
      selectAll.value = false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'validate'): void
}>()

function updateModel(value: string[]) {
  emit('update:modelValue', value)
  emit('validate')
}

function filterFn(val: string, update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void, /* abort */) {
  update(() => {
      const needle = val.toLocaleLowerCase()
      options.value = props.options.filter((v: { name: string, id: string }) => v.name.toLocaleLowerCase().indexOf(needle) > -1)
  })
}

onUnmounted(() => updateModel([]))
</script>
