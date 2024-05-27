<template>
    <q-tooltip :class="contentClass" content-style="font-size: 13px">
        <slot>{{ text }}</slot>
    </q-tooltip>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
    text: String,
    contentClass: {
        type: String,
        default: 'bg-ap-secondary'
    }
});
</script>
