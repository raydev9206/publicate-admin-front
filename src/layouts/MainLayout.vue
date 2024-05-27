<template>
  <q-layout view="lHh Lpr lFf" class="nunito_regular">
    <q-header elevated class="container-header">
      <q-btn round color="grey-1">
        <img v-if="true" src="/icons/Notifications.svg" />
        <img v-else src="/icons/NotificationsActive.svg" />
      </q-btn>
      <btn-dropdown
        :group="optionsWithAuth"
        rounded
        color="grey-1"
        label="Menu principal"
        text-color="secondary"
      />
    </q-header>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
      style="background-color: #101920"
      :mini="!leftDrawerOpen || miniState"
      @click.capture="drawerClick"
      :width="300"
      :breakpoint="500"
      bordered
    >
      <div
        class="absolute-top"
        style="height: 80px; background-color: rgba(255, 255, 255, 0.05)"
      >
        <div
          v-if="!miniState"
          class="q-pa-sm row justify-center items-center"
          style="height: 80px"
        >
          <div class="flex items-center justify-center">
            <img
              class="doc-header__logo-text"
              src="https://cdn.quasar.dev/logo-v2/svg/logotype-dark.svg"
              alt="Quasar Logo"
              width="150"
              height="20"
            />
          </div>
        </div>
        <div
          v-else-if="miniState"
          class="row q-pa-sm justify-center items-center"
          style="height: 80px"
        >
          <div class="flex items-center justify-center">
            <img
              class="doc-header__logo-img"
              src="https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg"
              alt="Quasar Logo"
              width="40"
              height="40"
            />
          </div>
        </div>
      </div>
      <q-scroll-area
        :horizontal-thumb-style="{ opacity: '0' }"
        style="
          height: calc(100% - 150px);
          margin-top: 100px;
          padding: 0 8px 0 8px;
          border-right: 1px solid #101920;
        "
      >
        <div
          :class="{
            'drawer-menu-open': !miniState,
            'drawer-menu-closed': miniState,
          }"
        >
          <q-btn
            flat
            color="white"
            icon="las la-bars"
            @click="miniState = !miniState"
            :class="{
              'drawer-items': !miniState,
              'drawer-items-off': miniState,
            }"
          />
        </div>
        <q-list class="drawer-open">
          <q-expansion-item
            expand-separator
            class="drawer-expansion drawer-items-text"
            icon="menu_open"
            label="Negocio"
            v-if="userRoles?.includes('Administrator')"
            default-opened
            exact
          >
          <q-item
            v-if="userRoles?.includes('Administrator')"
            clickable
            v-ripple
            to="/business"
            class="drawer-items"
            @click="activeRoute = 'business'"
          >
            <q-item-section avatar>
              <q-icon name="storefront" />
            </q-item-section>
            <q-item-section v-if="!miniState" class="drawer-items-text">
              Negocio
            </q-item-section>
          </q-item>
          <q-item
            v-if="userRoles?.includes('Administrator')"
            clickable
            v-ripple
            to="/category"
            class="drawer-items"
            @click="activeRoute = 'category'"
          >
            <q-item-section avatar>
              <q-icon name="category" />
            </q-item-section>
            <q-item-section v-if="!miniState" class="drawer-items-text">
              Categoría
            </q-item-section>
          </q-item>
          <q-item
            v-if="userRoles?.includes('Administrator')"
            clickable
            v-ripple
            to="/scategory"
            class="drawer-items"
            @click="activeRoute = 'scategory'"
          >
            <q-item-section avatar>
              <q-icon name="subject" />
            </q-item-section>
            <q-item-section v-if="!miniState" class="drawer-items-text">
              Sub categoría
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            class="drawer-items"
            to="/offer"
            @click="activeRoute = 'offer'"
          >
            <q-item-section avatar>
              <q-icon name="dining" />
            </q-item-section>
            <q-item-section v-if="!miniState" class="drawer-items-text">
              Oferta
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            class="drawer-items"
            to="/specification"
            @click="activeRoute = 'specification'"
          >
            <q-item-section avatar>
              <q-icon name="icecream" />
            </q-item-section>
            <q-item-section v-if="!miniState" class="drawer-items-text">
              Sabor
            </q-item-section>
          </q-item>
        </q-expansion-item>
          <q-expansion-item
            expand-separator
            class="drawer-expansion drawer-items-text"
            icon="las la-server"
            label="Administración"
            v-if="userRoles?.includes('Administrator')"
            default-opened
            exact
          >
            <q-item clickable v-ripple class="drawer-items-text" to="/admin/user">
              <q-item-section avatar class="q-ml-md">
                <q-icon name="las la-stream" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Usuario</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import btnDropdown from 'src/components/defaultComponents/buttons/btnDropdown.vue';
import { computed, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';

const leftDrawerOpen = ref(false);
const miniState = ref(false);
const activeRoute = ref('business');
const storeAuth = useAuthStore();

const userRoles = computed(() => storeAuth.userRoles());
function drawerClick(e: Event) {
  if (miniState.value) {
    miniState.value = false;
    e.stopPropagation();
  }
}

const optionsWithAuth = [
  {
    title: 'Cerrar sesión',
  },
];
</script>

<style scoped>
.container-header {
  padding-right: 64px;
  background: white;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.drawer-open {
  height: calc(100% - 130px);
  margin-top: 20px;
}

.drawer-menu-open {
  display: flex;
  justify-content: flex-start;
}

.drawer-menu-closed {
  display: flex;
  justify-content: center;
}
</style>
