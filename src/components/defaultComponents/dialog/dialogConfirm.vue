<template>
  <div class="pointer nunito_regular" v-if="noBtn" @click="showModal()">
    <slot name="noBtn" />
  </div>
  <btnPrimary
    v-else-if="!btnIcon"
    text-color="secondary"
    class="q-mt-lg nunito_regular"
    height
    width
    :color="color"
    :border="border"
    :label="btnLabel"
    @onClickBtn="showModal()"
  >
  </btnPrimary>
  <q-btn
    v-else
    style="border-radius: 8px; border: 1px solid #9c9c9c"
    text-color="secondary"
    color=""
    size="10px"
    :dense="true"
    @click="showModal()"
  >
    <slot name="content" />
  </q-btn>

  <q-dialog v-model="model">
    <q-card class="card">
      <q-btn icon="close" class="btn-close" flat round dense v-close-popup />
      <div class="message">
        <div class="message-container">
          <div class="text-3 text-center">{{ title }}</div>
          <slot v-if="inputDelete" />
          <div v-else class="text-5 text-center">{{ description }}</div>
          <slot name="body" />
          <div v-if="inputDelete" style="width: 100%">
            <q-input
              class=""
              ref="deleteInput"
              outlined
              type="text"
              color="secondary"
              v-model="deleteClient"
              required="true"
              dense
              placeholder="eliminar"
              bg-color="white"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor escribe eliminar',
                (val) =>
                  (val && val === 'eliminar') || 'Por favor escribe eliminar',
              ]"
            />
          </div>
        </div>
        <div class="container-buttons">
          <btnPrimary
            v-close-popup="inputDelete ? deleteClient === 'eliminar' : 1"
            :text-color="inputDelete ? 'white' : 'secondary'"
            class="q-mt-lg nunito_regular"
            :color="inputDelete ? 'red' : 'primary'"
            height
            width
            :label="btnBtn"
            @click="handlerClick"
          />
          <btnPrimary
            v-close-popup
            text-color="secondary"
            class="q-mt-lg nunito_regular"
            color=""
            height
            width
            border
            label="Cancel"
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';

const deleteClient = ref('');
const deleteInput = ref();

const model = ref(false);

function showModal() {
  deleteClient.value = '';
  model.value = true;
}

onMounted(() => {
  deleteClient.value = '';
});

const props = defineProps({
  btnLabel: { type: String, default: '' },
  btnBtn: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  color: { type: String, default: 'primary' },
  border: { type: Boolean, default: false },
  inputDelete: { type: Boolean, default: false },
  btnIcon: { type: Boolean, default: false },
  noBtn: { type: Boolean, default: false },
});

const handlerClick = () => {
  if (deleteInput.value) {
    deleteInput.value.validate();
  }
  if (props.inputDelete) {
    if (deleteClient.value === 'eliminar') {
      emit('confirm');
    }
  } else {
    emit('confirm');
  }
};

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.btn-trigger {
  width: 34.5px;
  height: 34.5px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.card {
  width: 720px;
  min-height: 320px;
  position: relative;
  padding: 96px 140px 52px 140px;
}

.q-dialog__inner--minimized > div {
  max-width: 720px;
}

.btn-close {
  position: absolute;
  top: 20px;
  right: 20px;
}

.message {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
</style>
