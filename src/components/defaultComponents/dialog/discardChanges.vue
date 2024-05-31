<template>
    <q-dialog v-if="showModalConfirm && !canNext" v-model="model" persistent>
        <q-card class="card">
            <q-btn icon="close" class="btn-close" flat round dense v-close-popup />
            <div class="message">
                <div class="message-container">
                    <div class="text-3 text-center">Los cambios no han sido guardados</div>
                    <div class="text-5 text-center">Seguro quieres descartarlos?</div>
                </div>
                <div class="container-buttons">
                    <btnPrimary v-close-popup text-color="secondary" class="q-mt-lg nunito_regular" color="primary"
                        height width label="Confirmar" @click="handlerConfirm" />
                    <btnPrimary v-close-popup text-color="secondary" class="q-mt-lg nunito_regular" color="" height
                        width border label="Cancelar" @click="handlerCancel" />
                </div>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import { onBeforeRouteLeave } from 'vue-router';

const model = ref(true)

defineProps({
    btnLabel: { type: String, default: '' },
    btnBtn: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    color: { type: String, default: 'primary' },
    border: { type: Boolean, default: false },
    inputDelete: { type: Boolean, default: false },
    btnIcon: { type: Boolean, default: false },
    noBtn: { type: Boolean, default: false },
})

const handlerConfirm = () => {
    emit('confirm')
    showModalConfirm.value = false
    canNext.value = true
    router.push(routerTo.value)
}
const handlerCancel = () => {
    emit('cancel')
    showModalConfirm.value = false
}

const emit = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()


const showModalConfirm = ref(false)
const routerTo = ref('')
const canNext = ref(false)
import { useRouter } from 'vue-router';
const router = useRouter();
/* function confirmDiscardChanges() {
    showModalConfirm.value = false
    canNext.value = true
    router.push(routerTo.value)
}
function cancelDiscardChanges() {
    showModalConfirm.value = false
} */
onBeforeRouteLeave((to, from, next) => {
    routerTo.value = to.fullPath
    showModalConfirm.value = true
    if (canNext.value) {
        next();
    } else {
        next(false);
    }
});
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

.q-dialog__inner--minimized>div {
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
