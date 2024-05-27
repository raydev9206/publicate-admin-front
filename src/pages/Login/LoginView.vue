<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="bg-grey-2 caviar_dreams_bold">
      <q-page padding class="row items-center justify-center">
        <div class="row full-width justify-center">
          <div class="col-md-8 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card flat class="bg-white text-black">
              <div class="row">
                <div class="row col-md-6 col-xs-12 q-pa-md items-center justify-center">
                  <q-img placeholder-src="~assets/img/login.png" src="~assets/img/login.png"
                    spinner-color="white"></q-img>
                </div>

                <div class="col-md-6 col-xs-12 q-pa-md">
                  <div class="q-px-md q-py-sm">
                    <div class="text-h6 q-pb-sm text-blue-8 text-center text-weight-bolder">
                      Inicia sesión
                    </div>
                    <q-form class="q-gutter-md">
                      <q-input filled v-model="username" label="Usuario" lazy-rules :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Por favor, escriba su usuario',
                      ]" />

                      <q-input filled :type="isPwd ? 'password' : 'text'" v-model="password" label="Contraseña"
                        lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') ||
                            'Por favor,escriba su contraseña'
                        ]">
                        <template v-slot:append>
                          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                        </template>
                      </q-input>

                      <div class="row justify-center items-center">
                        <BtnPrimary class="nunito_regular" color="primary" :disable="!activeBtnAuth" label="ACCEDER"
                          @onClickBtn="submit" :loading="loading" :width="true">
                        </BtnPrimary>
                      </div>
                    </q-form>
                    <div v-if="error" class="q-pa-sm">
                      <p class="message-error text-red nunito_regular">The email or password is incorrect.</p>
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import BtnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import { useAuthStore } from 'src/stores/auth-store'; // Import the Pinia store
import { ref, computed } from 'vue';


const authStore = useAuthStore(); // Access the Pinia store instance
const username = ref('');
const password = ref('');
const isPwd = ref(true)
const loading = ref(false);
const error = ref(false);
const activeBtnAuth = computed(() => username.value && password.value);

const { login } = authStore;

const submit = async () => {
  loading.value = !loading.value;
  try {
    const res = await login({
      username: username.value,
      password: password.value,
    });
    if (res?.error === 401) {
      error.value = true
    } else {
      error.value = false
    }
    loading.value = !loading.value;
  } catch (error) {
    loading.value = !loading.value;
  }
};
</script>

<style lang="scss" scoped>
.padding-content {
  border-radius: 18px;
  padding: 40px;
}

.message-error {
  font-size: 14px;
  line-height: 19.1px;
  text-align: center;
}
</style>
