<template>
  <cardForm moduleName="business" nameForm="Adicionar negocio" title="Nuevo negocio" parentRoute="Negocios">
    <template #body>
      <div class="row-input">
        <inputField nameRef="name" :model-value="business.name" class="full-width" label="Nombre" :required="true"
          @update:modelValue="(newVal: string) => business.name = newVal" :rules="formRules.name"
          :isInvalidProp="isInvalid" :errorMessage="nameErrorMessage" @validate="validateInput('name')" />
        <div class="full-width"></div>
      </div>
    </template>
    <template #buttons>
      <div class="container-buttons">
        <btnPrimary text-color="secondary" class="q-mt-lg nunito_regular" height width label="Guardar"
          @onClickBtn="handleAddCategory" :loading="loading" />
        <btnPrimary to="/business" text-color="secondary" class="q-mt-lg nunito_regular" color="" height width border
          label="Cancelar" />
      </div>
    </template>
  </cardForm>
  <discardChanges v-if="!isAdd" />
</template>

<script setup lang="ts">
//Vue
import { ref, computed, Ref } from 'vue';
//components
import inputField from 'src/components/defaultComponents/inputs/inputField.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import discardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';
//Composable
import useCategories from 'src/composables/useBusiness';
//interface
import cardForm from 'src/components/cardForm.vue';
// Validation
import { useValidationRule } from 'src/composables/useValidationRule';
import formRules from 'src/conf/rules/business'
import IBusiness from 'src/interfaces/Business/IBusiness';

const loading = ref(false)
// Validation
const [nameValidate] = [formRules.name].map(useValidationRule)
const [isInvalid] = [nameValidate].map(validate => ref(validate.isInvalid))
const [nameErrorMessage] = [nameValidate, nameValidate].map(validate => ref(validate.errorMessage))

const invalidForm = computed(() => {
  return isInvalid.value
});
const { createBusiness } = useCategories()

const business = ref(<IBusiness>{
  name: '',
  logo: 'true',
})

const isAdd = ref(false)
async function handleAddCategory() {
  validateForm()
  if (!invalidForm.value) {
    loading.value = true;
    const res = await createBusiness(business.value)
    isAdd.value = true
    if (res.statusCode === 403) {
      isInvalid.value = true
      nameErrorMessage.value = 'El negocio ya está registrado'
    }
    loading.value = false;
  }
}

function validateForm() {
  const errors = [
    nameValidate.validate(business.value.name),
  ]
  return !errors.some((result) => result);
};

function validateInput(input: string) {
  const errors: Ref<(string | boolean | number)[]> = ref([])
  if (input === 'name') {
    errors.value = [nameValidate.validate(input)]
  }
  return !errors.value.some((result) => result);
};
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
