<template>
  <cardForm
    moduleName="category"
    nameForm="Detalles"
    :title="!editCategory ? 'Detalles de categoría' : 'Editar categoría'"
    parentRoute="Categorías"
  >
    <template #body>
      <div class="translate">
        <div class="language" @click="language = 'English'">
          <p class="text-16">Inglés</p>
          <div v-if="language === 'English'" class="vector"></div>
        </div>
        <div class="language" @click="language = 'Spanish'">
          <p class="text-16">Español</p>
          <div v-if="language === 'Spanish'" class="vector"></div>
        </div>
      </div>
      <div class="row-input">
        <inputField
          nameRef="nameEng"
          :disable="!editCategory"
          v-if="language === 'English'"
          :model-value="category.name.en"
          class="full-width"
          label="Nombre"
          :required="true"
          @update:modelValue="(newVal: string) => (category.name.en = newVal)"
          :rules="formRules.nameEng"
          :isInvalidProp="isInvalidEng"
          :errorMessage="nameEngErrorMessage"
          @validate="validateInput('name', 'English')"
        />
        <inputField
          nameRef="nameEsp"
          :disable="!editCategory"
          v-if="language === 'Spanish'"
          :model-value="category.name.es"
          class="full-width"
          label="Nombre"
          :required="true"
          @update:modelValue="(newVal: string) => (category.name.es = newVal)"
          :rules="formRules.nameEsp"
          :isInvalidProp="isInvalidEsp"
          :errorMessage="nameEspErrorMessage"
          @validate="validateInput('name', 'Spanish')"
        />
        <inputField
          nameRef="order"
          :disable="!editCategory"
          type="number"
          :model-value="category.order"
          class="full-width"
          label="Orden"
          :required="true"
          @update:modelValue="(newVal: string) => (category.order = newVal)"
          :rules="formRules.order"
          :isInvalidProp="isInvalidEng"
          :errorMessage="orderErrorMessage"
          @validate="validateInput('name', 'English')"
        />
      </div>
    </template>
    <template #buttons>
      <div class="container-buttons">
        <btnPrimary
          v-if="editCategory"
          text-color="secondary"
          class="q-mt-lg nunito_regular"
          height
          width
          label="Guardar cambios"
          @onClickBtn="handleEditCategory"
          :loading="loading"
        />
        <dialogConfirm
          v-else
          @confirm="editCategory = true"
          btn-label="Editar"
          btn-btn="Confirmar"
          title="Editar categoría"
          description="Está seguro que desea editar esta categoría?"
        />
        <dialogConfirm
          @confirm="handleDelCategory"
          :input-delete="true"
          color=""
          border
          btn-label="Eliminar"
          btn-btn="Eliminar"
          title="Eliminar categoría"
        >
          <div class="text-5 text-center">
            Está seguro que desea eliminar esta categoría?<br />
            Escribe <strong>“eliminar”</strong> para mayor seguridad.
          </div>
        </dialogConfirm>
        <btnPrimary
          text-color="secondary"
          class="q-mt-lg nunito_regular"
          color=""
          border
          height
          width
          label="Cancelar"
          to="/category"
        />
      </div>
    </template>
  </cardForm>
  <DiscardChanges v-if="editCategory" />
</template>

<script setup lang="ts">
//Vue
import { ref, onMounted, watch, computed, Ref } from 'vue';
import { useRoute } from 'vue-router';
//components
import dialogConfirm from 'src/components/defaultComponents/dialog/dialogConfirm.vue';
import inputField from 'src/components/defaultComponents/inputs/inputField.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
//Composable
import useCategory from 'src/composables/useCategory';
//interface
import ICategory from 'src/interfaces/Category/ICategory';
import cardForm from 'src/components/cardForm.vue';
// Validation
import { useValidationRule } from 'src/composables/useValidationRule';
import formRules from 'src/conf/rules/category';
import DiscardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';
import { Translations } from 'src/interfaces/Traslation';

const route = useRoute();
const language = ref<'English' | 'Spanish'>('English');
const { getCategoryById, patchCategory, deleteCategory } = useCategory();
const category = ref(<ICategory>{
  name: <Translations>{
    es: '',
    en: '',
  },
  isActive: true,
  order: 0,
});

const loading = ref(false);
// Validation
const [nameEspValidate, nameEngValidate, orderValidate] = [
  formRules.nameEng,
  formRules.nameEsp,
  formRules.order,
].map(useValidationRule);
const [isInvalidEsp, isInvalidEng] = [nameEspValidate, nameEngValidate].map(
  (validate) => ref(validate.isInvalid),
);
const [nameEngErrorMessage, nameEspErrorMessage, orderErrorMessage] = [
  nameEspValidate,
  nameEngValidate,
  orderValidate,
].map((validate) => ref(validate.errorMessage));

const fetchData = async () => {
  const res = await getCategoryById(route.params.id);
  updateCategory(res);
};

const invalidForm = computed(() => {
  return isInvalidEng.value || isInvalidEsp.value;
});

onMounted(fetchData);
watch(() => route.params.id, fetchData);

const handleEditCategory = async () => {
  validateForm();
  if (!invalidForm.value) {
    loading.value = true;
    const res = await patchCategory(route.params.id, category.value);
    if (res.statusCode === 400) {
      isInvalidEsp.value = true;
      isInvalidEng.value = true;
      nameEngErrorMessage.value = 'La categoría ya está registrada';
      nameEspErrorMessage.value = 'La categoría ya está registrada';
      loading.value = false;
      return;
    }
    loading.value = false;
    editCategory.value = false;
    updateCategory(res);
  }
};

const handleDelCategory = async () => {
  if (!invalidForm.value) {
    loading.value = true;
    await deleteCategory(route.params.id);
    editCategory.value = false;
    loading.value = false;
  }
};

function validateForm() {
  const errors = [
    nameEspValidate.validate(category.value.name.es),
    nameEngValidate.validate(category.value.name.en),
  ];
  return !errors.some((result) => result);
}

function validateInput(input: string, lang: string) {
  const errors: Ref<(string | boolean | number)[]> = ref([]);
  if (input === 'name') {
    const { es, en } = category.value[input];
    if (lang === 'English') errors.value = [nameEngValidate.validate(en)];
    if (lang === 'Spanish') errors.value = [nameEspValidate.validate(es)];
  }
  return !errors.value.some((result) => result);
}

const editCategory = ref(false);

const updateCategory = (obj: ICategory) => {
  category.value.name = obj.name;
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
