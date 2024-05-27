<template>
  <q-btn-dropdown
    :color="color"
    :text-color="textColor"
    :rounded="rounded"
    no-caps
  >
    <template v-slot:label>
      <div class="dropdown-content">
        <!--  <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
        <UserIcon />
        <div class="row items-center no-wrap q-ml-sm">
          <div class="text-center">{{ label }}</div>
        </div>
      </div>
    </template>
    <q-list>
      <div v-for="(item, index) in group" :key="index">
        <q-item class="item-container" v-if="item.title">
          <p v-if="item.title && item.title !== 'Cerrar sesión'" class="text-6">
            {{ item.title }}
          </p>
          <DialogConfirm
            v-else
            @confirm="logout"
            :no-btn="true"
            btn-label="Editar perfil"
            btn-btn="Confirmar"
            title="Cerrar sesión"
            description="¿Está seguro que desea cerrar sesión?"
          >
            <template v-slot:noBtn>
              <p class="text-7">Cerrar sesión</p>
            </template>
          </DialogConfirm>
        </q-item>
        <q-item
          class="item-container"
          v-for="(el, index) in item.children"
          :key="index"
          :to="`/${el.route}`"
          clickable
          v-close-popup
          @click="onItemClick"
        >
          <p class="text-7">{{ el.label }}</p>
        </q-item>
        <LineSeparator v-if="index < group.length - 1" />
      </div>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
//import ArrowDownDropdownButton from 'src/assets/icons/arrows/ArrowDownDropdownButton.vue';
import UserIcon from 'src/assets/icons/UserIcon.vue';
import LineSeparator from '../LineSeparator.vue';
import DialogConfirm from '../dialog/dialogConfirm.vue';
import { useAuthStore } from 'src/stores/auth-store';

const { logout } = useAuthStore();

defineProps({
  group: {
    type: Array<{
      title?: string;
      children?: Array<{ label?: string; linkTo?: boolean; route?: string }>;
    }>,
    default: [],
  },
  label: {
    type: String,
    default: '',
  },
  border: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'primary',
  },
  textColor: {
    type: String,
    default: 'secondary',
  },
  tooltip: {
    type: String,
    default: null,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  tagLang: {
    type: String,
    default: '',
  },
  round: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: '',
  },
});

const onItemClick = () => {
  //on item click
};
</script>

<style scoped>
.q-btn {
  height: 48px;
  padding: 8px 10px;
  text-transform: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
}

.dropdown-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.item-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.q-item {
  padding: 0;
}

.q-btn:before {
  box-shadow: none;
}

#f_37b755af-8366-4664-afb2-bcdae8dd572b {
  top: 100;
}
</style>
