<template>
  <cardForm
    moduleName="admin/user"
    nameForm="Adicionar usuario"
    title="Nuevo usuario"
    parentRoute="Usuario"
  >
    <template #body>
      <div class="row-input items-center justify-center">
        <inputField
          nameRef="username"
          :model-value="user.username"
          class="full-width"
          label="Nombre de usuario"
          :required="true"
          @update:modelValue="(newVal: string) => (user.username = newVal)"
          :rules="formRules.username"
          :isInvalidProp="isInvalidUsername"
          :errorMessage="usernameErrorMessage"
          @validate="validateInput('username')"
        />
        <inputField
          nameRef="email"
          :model-value="user.email"
          class="full-width"
          label="Correo"
          :required="true"
          @update:modelValue="(newVal: string) => (user.email = newVal)"
          :rules="formRules.email"
          :isInvalidProp="isInvalidEmail"
          :errorMessage="emailErrorMessage"
          @validate="validateInput('email')"
        />
      </div>
      <div class="row-input items-center justify-center">
        <inputField
          nameRef="phone"
          :model-value="user.phone"
          class="full-width"
          label="Teléfono"
          :required="true"
          @update:modelValue="(newVal: string) => (user.phone = newVal)"
          :rules="formRules.phone"
          :isInvalidProp="isInvalidPhone"
          :errorMessage="phoneErrorMessage"
          @validate="validateInput('phone')"
        />
        <InputFieldPass
          nameRef="password"
          :model-value="user.password"
          class="full-width"
          label="Contraseña"
          :required="true"
          @update:modelValue="(newVal: string) => (user.password = newVal)"
          :rules="formRules.password"
          :isInvalidProp="isInvalidPassword"
          @validate="validateInput('password')"
          :errorMessage="passwordErrorMessage"
        />
      </div>
      <div class="row-input justify-center">
        <InputSelectMultiple
          class="full-width"
          placeholder="Seleccione un rol"
          :required="true"
          :options="optionsRoles"
          :model-value="user.roles"
          :optionsValueLabel="true"
          @update:modelValue="(newVal: string[]) => user.roles = newVal"
          label="Rol"
          multiple
          @validate="validateInput('roles')"
        />
        <InputSelect
          class="full-width"
          placeholder="Seleccione un negocio"
          :required="true"
          :options="optionsBusiness"
          :model-value="user.business_id"
          @update:modelValue="(newVal: string) => (user.business_id = newVal)"
          label="Negocio"
          :rules="formRules.business"
          :isInvalidProp="isInvalidBusiness"
          :errorMessage="businessErrorMessage"
          @validate="validateInput('business')"
        />
      </div>
    </template>
    <template #buttons>
      <div class="container-buttons">
        <btnPrimary
          text-color="secondary"
          class="q-mt-lg nunito_regular"
          height
          width
          label="Guardar"
          @onClickBtn="handleAddUser"
          :loading="loading"
        />
        <btnPrimary
          to="/admin/user"
          text-color="secondary"
          class="q-mt-lg nunito_regular"
          color=""
          height
          width
          border
          label="Cancelar"
        />
      </div>
    </template>
  </cardForm>
  <discardChanges v-if="!isAdd" />
</template>
<script setup lang="ts">
//Vue
import { ref, computed, Ref, onBeforeMount } from 'vue';
//components
import inputField from 'src/components/defaultComponents/inputs/inputField.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import discardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';
//Composable
import useUser from 'src/composables/useUser';
//interface
import cardForm from 'src/components/cardForm.vue';
// Validation
import { useValidationRule } from 'src/composables/useValidationRule';
import formRules from 'src/conf/rules/user';
import IUser from 'src/interfaces/User/IUser';
import InputFieldPass from 'src/components/defaultComponents/inputs/inputFieldPass.vue';
import { useBusiness } from 'src/composables';
import InputSelectMultiple from 'src/components/defaultComponents/inputs/inputSelectMultiple.vue';
import InputSelect from 'src/components/defaultComponents/inputs/inputSelect.vue';

const loading = ref(false);
const optionsRoles = [
  {
    name: 'Administrator',
    id: '1',
  },
  {
    name: 'Client',
    id: '2',
  },
];
const optionsBusiness = ref([]);
// Validation
const [
  usernameValidate,
  emailValidate,
  passwordvalidate,
  phonevalidate,
  businessvalidate,
] = [
  formRules.username,
  formRules.email,
  formRules.password,
  formRules.phone,
  formRules.business,
].map(useValidationRule);

const [
  isInvalidUsername,
  isInvalidEmail,
  isInvalidPassword,
  isInvalidPhone,
  isInvalidBusiness,
] = [
  usernameValidate,
  emailValidate,
  passwordvalidate,
  phonevalidate,
  businessvalidate,
].map((validate) => ref(validate.isInvalid));

const [
  usernameErrorMessage,
  emailErrorMessage,
  passwordErrorMessage,
  phoneErrorMessage,
  businessErrorMessage,
] = [
  usernameValidate,
  emailValidate,
  passwordvalidate,
  phonevalidate,
  businessvalidate,
].map((validate) => ref(validate.errorMessage));

const invalidForm = computed(() => {
  return isInvalidUsername || isInvalidEmail || isInvalidPassword || isInvalidPhone || isInvalidBusiness;
});
const { createUser } = useUser();
const { getAll } = useBusiness();
const user = ref(<IUser>{
  username: '',
  email: '',
  phone: '',
  password: '',
  roles: [],
  business_id: '',
});

const isAdd = ref(false);
async function handleAddUser() {
  validateForm();
  if (invalidForm.value) {
    loading.value = true;
    const res = await createUser(user.value);
    isAdd.value = true;
    if (res.statusCode === 409) {
      isInvalidUsername.value = true;
      usernameErrorMessage.value = 'El usuario ya está registrado';
    }
    loading.value = false;
  }
}

function validateForm() {
  const errors = [usernameValidate.validate(user.value.username),
  emailValidate.validate(user.value.email),
  passwordvalidate.validate(user.value.password),
  phonevalidate.validate(user.value.phone),
  businessvalidate.validate(user.value.business_id)];
  return !errors.some((result) => result);
}

function validateInput(input: string) {
  const errors: Ref<(string | boolean | number)[]> = ref([]);
  if (input === 'username') {
    errors.value = [usernameValidate.validate(user.value[input])];
  }
  if(input === 'email') {
    errors.value = [emailValidate.validate(user.value[input])];
  }
  if(input === 'password') {
    errors.value = [passwordvalidate.validate(user.value[input])];
  }
  if(input === 'phone') {
    errors.value = [phonevalidate.validate(user.value[input])];
  }
  return !errors.value.some((result) => result);
}

onBeforeMount(async () => {
  const res = await getAll({ search: '' });
  optionsBusiness.value = res.data;
});
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  display: flex;
  align-items: center;
  gap: 64px;
}

.card-img {
  height: 120px;
  width: 96px;
  min-width: 96px;
  background-size: cover;
  border-radius: 16px;
}

.card-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
