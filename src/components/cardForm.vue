<template>
  <q-card class="container-form bg-grey-300">
    <div style="display: flex; flex-direction: column;gap: 24px; width: 100%; min-height: calc(100vh - 300px);">
      <q-card-section style="display: flex; justify-content: space-between; width: 100%; padding: 0;">
        <div style="display: flex;align-items: center; gap: 4px;">
          <p class="text-16-semibold cursor-pointer capitalize" @click="Router.push(`/${moduleName}`)">{{ parentRoute }}
          </p>
          <ArrowLeftIcon />
          <p class="text-16-grey">{{ nameForm }}</p>
        </div>
        <div class="requests-status bg-primary-1" v-if="status !== ''" :class="{
            'bg-primary-1': status === 'Pending',
            'bg-success-1': status === 'Approved',
            'bg-error-1': status === 'Rejected',
          }">
          <p class="text-5">{{ status }}</p>
        </div>
      </q-card-section>
      <q-card-section v-if="title" class="container-title" style="padding: 0;">
        <h1 class="title-4">{{ title }}</h1>
        <LineSeparator />
      </q-card-section>
      <slot name="body"></slot>
    </div>
    <LineSeparator />
    <q-card-actions class="container-buttons">
      <slot name="buttons"></slot>
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
import ArrowLeftIcon from 'src/assets/icons/arrows/ArrowLeftIcon.vue';
import LineSeparator from 'src/components/defaultComponents/LineSeparator.vue';
import { Router } from '../router/index';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  nameForm: {
    type: String,
    default: ''
  },
  moduleName: {
    type: String,
    default: ''
  },
  parentRoute: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  }
})
</script>
