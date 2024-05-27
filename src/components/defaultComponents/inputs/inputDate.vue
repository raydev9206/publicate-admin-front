<template>
    <div class="">
        <div class="row q-my-sm">
            <div class="q-px-xs text-ap-primary nunito_bold" style="font-size: 14px; line-height: 19.1px;">{{ label }}
            </div>
            <img v-if="required" src="/icons/Aster.svg" />
        </div>
        <q-input :model-value="inputValue" :class="classField" :standout="disable" :outlined="!disable"
            :disable="disable" dense lazy-rules color="secondary" :bg-color="disable ? 'grey-5' : 'white'"
            @update:modelValue="(newValue: any) => updateModel(newValue)" :error="isInvalid"
            :error-message="errorMessage">
            <template v-slot:append>
                <q-icon name="img:icons/Calendar.svg" class="cursor-pointer">
                    <q-popup-proxy class="popup-filter" transition-show="scale" transition-hide="scale"
                        style="padding:1px;width: 292px;">
                        <q-date :model-value="inputValue" mask="MMM D, YYYY"
                            @update:modelValue="(newValue: any) => updateModel(newValue)">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-date>
                    </q-popup-proxy>
                </q-icon>
            </template>
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
        type: String,
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

<style scoped>
.popup-filter {
    padding: 0;
    width: 350px;
    height: 430px;
}
.q-date{
    min-width: 200px;
    min-height: 420px
}
.q-date__actions {
    padding: 0 ;
}
</style>