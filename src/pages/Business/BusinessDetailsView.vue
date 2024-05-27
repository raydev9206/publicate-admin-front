<template>
  <cardForm moduleName="business" nameForm="Detalles" :title="!editBusiness ? 'Detalles del negocio' : 'Editar negocio'"
  parentRoute="Negocios">
    <template #body>
      <div class="row-input">
        <inputField nameRef="name"  :model-value="category.name"
          class="full-width" label="Nombre" :disable="!editBusiness" :required="true"
          @update:modelValue="(newVal: string) => category.name = newVal" :rules="formRules.name"
          :isInvalidProp="isInvalid" :errorMessage="nameErrorMessage"
          @validate="validateInput('name')" />
        <div class="full-width"></div>
      </div>
    </template>
    <template #buttons>
      <div class="container-buttons">
        <btnPrimary v-if="editBusiness" text-color="secondary" class="q-mt-lg nunito_regular" height width
          label="Guardar cambios" @onClickBtn="handleEditBusiness" :loading="loading" />
        <dialogConfirm v-else @confirm="editBusiness = true" btn-label="Editar" btn-btn="Confirmar" title="Editar negocio"
          description="Está seguro que desea editar este negocio?" />
        <dialogConfirm @confirm="handleDelBusiness" :input-delete="true" color="" border btn-label="Eliminar"
          btn-btn="Eliminar" title="Eliminar negocio">
          <div class="text-5 text-center">Está seguro que desea eliminar este negocio?<br />
            Escribe <strong>“eliminar”</strong> para mayor seguridad.</div>
        </dialogConfirm>
        <btnPrimary text-color="secondary" class="q-mt-lg nunito_regular" color="" border height width label="Cancelar"
          to="/business" />
      </div>
    </template>
  </cardForm>
  <DiscardChanges v-if="editBusiness" />
</template>

<script setup lang="ts">
//Vue
import { ref, onMounted, watch, computed, Ref } from 'vue';
import { useRoute } from 'vue-router'
//components
import dialogConfirm from 'src/components/defaultComponents/dialog/dialogConfirm.vue';
import inputField from 'src/components/defaultComponents/inputs/inputField.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
//Composable
import useBusiness from 'src/composables/useBusiness';
//interface
import IBusiness from 'src/interfaces/Business/IBusiness';
import cardForm from 'src/components/cardForm.vue';
// Validation
import { useValidationRule } from 'src/composables/useValidationRule';
import formRules from 'src/conf/rules/business'
import DiscardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';

const route = useRoute()

const { getBusinessById, patchBusiness, deleteBusiness } = useBusiness()
const category = ref(<IBusiness>{
  name:'',
  logo: '',
})

const loading = ref(false)
//Validations
const [nameValidate] = [formRules.name].map(useValidationRule)
const [isInvalid] = [nameValidate].map(validate => ref(validate.isInvalid))
const [nameErrorMessage] = [nameValidate, nameValidate].map(validate => ref(validate.errorMessage))

const fetchData = async () => {
  const res = await getBusinessById(route.params.id)
  updateBusiness(res)
}

const invalidForm = computed(() => {
  return isInvalid.value
});

onMounted(fetchData)
watch(() => route.params.id, fetchData)

const handleEditBusiness = async () => {
  validateForm()
  if (!invalidForm.value) {
    loading.value = true;
    const res = await patchBusiness(route.params.id, category.value)
    if (res.statusCode === 400) {
      isInvalid.value = true
      nameErrorMessage.value = 'El negocio ya está registrado'
      loading.value = false;
      return
    }
    loading.value = false;
    editBusiness.value = false
    updateBusiness(res)
  }
}

const handleDelBusiness = async () => {
  if (!invalidForm.value) {
    loading.value = true;
    const res = await deleteBusiness(route.params.id)
    console.log(res)
    loading.value = false;
  }
}

function validateForm() {
  const errors = [
    nameValidate.validate(category.value.name),
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

const editBusiness = ref(false)

const updateBusiness = (obj: IBusiness) => {
  category.value.name = obj.name
}
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
