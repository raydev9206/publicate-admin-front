<template>
  <q-btn :label="label" :color="disable ? 'grey-5' : color" :disable="disable" :outline="outline" :icon="icon"
    :round="round" :text-color="disable ? 'grey-6' : textColor" :rounded="rounded" :size="size"
    @click="$emit('onClickBtn')" class="btn-text" :class="{
    'h-40': btnTable,
    'h-56': !height && !btnTable,
    'w-208': width,
    'w-172': btnFilter,
    'border': border,
  }" no-caps :loading="loading">
    <template v-slot:loading>
      <q-spinner-hourglass class="on-left" />
    </template>
    <tooltipCmp v-if="tooltip" :text="tooltip" />
  </q-btn>
</template>

<script setup lang="ts">
import tooltipCmp from '../tooltip/tooltipCmp.vue';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  label: {
    type: String,
    default: null
  },
  border: {
    type: Boolean,
    default: false
  },
  width: {
    type: Boolean,
    default: false
  },
  btnFilter: {
    type: Boolean,
    default: false
  },
  btnTable: {
    type: Boolean,
    default: false
  },
  height: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  textColor: {
    type: String,
    default: 'grey-14'
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
    default: ''
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

/* const emit = defineEmits<{
  (e: 'onClickBtn'): void
}>() */

</script>

<style scoped>
.w-208 {
  width: 208px;
}
.w-172 {
  width: 172px;
}
.h-40 {
  height: 40px;
}
.h-48 {
  height: 48px;
}

.h-56 {
  height: 56px;
}

.border {
  border: 1px solid #9C9C9C;
}

.btn-text {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 8px 0 rgba(229, 229, 229, 0.08);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
