<template>
  <cardForm
    moduleName="specification"
    nameForm="Detalles"
    :title="!editSpecification ? 'Detalles de sabor' : 'Editar sabor'"
    parentRoute="Sabores"
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
      <div class="row-input items-center justify-center">
        <inputField
          nameRef="nameEng"
          v-if="language === 'English'"
          :model-value="specification.name.en"
          class="full-width"
          label="Nombre"
          :disable="!editSpecification"
          :required="true"
          @update:modelValue="
            (newVal: string) => (specification.name.en = newVal)
          "
          :rules="formRules.nameEng"
          :isInvalidProp="isInvalidEng"
          :errorMessage="nameEngErrorMessage"
          @validate="validateInput('name', 'English')"
        />
        <inputField
          nameRef="nameEsp"
          v-if="language === 'Spanish'"
          :model-value="specification.name.es"
          class="full-width"
          label="Nombre"
          :disable="!editSpecification"
          :required="true"
          @update:modelValue="
            (newVal: string) => (specification.name.es = newVal)
          "
          :rules="formRules.nameEsp"
          :isInvalidProp="isInvalidEsp"
          :errorMessage="nameEspErrorMessage"
          @validate="validateInput('name', 'Spanish')"
        />
        <inputSelect
          v-if="language === 'English'"
          class="full-width"
          placeholder="Seleccione una categoría"
          :required="true"
          :model-value="specification.category_id"
          :options="optionsEnglish"
          label="Categoría"
          :disable="!editSpecification"
          @update:modelValue="
            (newVal: string) => (specification.category_id = newVal)
          "
          :rules="formRules.categoryEng"
          :isInvalidProp="isInvalidCategoryEng"
          :errorMessage="categoryEngErrorMessage"
          @validate="validateInput('category', 'English')"
        />
        <inputSelect
          v-if="language === 'Spanish'"
          class="full-width"
          placeholder="Seleccione una categoría"
          @update:modelValue="
            (newVal: string) => (specification.category_id = newVal)
          "
          :required="true"
          :model-value="specification.category_id"
          :options="optionsSpanish"
          label="Categoría"
          :disable="!editSpecification"
          :rules="formRules.categoryEsp"
          :isInvalidProp="isInvalidCategoryEsp"
          :errorMessage="categoryEspErrorMessage"
          @validate="validateInput('category', 'Spanish')"
        />
      </div>
    </template>
    <template #buttons>
      <div class="container-buttons">
        <btnPrimary
          v-if="editSpecification"
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
          @confirm="editSpecification = true"
          btn-label="Editar"
          btn-btn="Confirmar"
          title="Editar sabor"
          description="Está seguro que desea editar este sabor?"
        />
        <dialogConfirm
          @confirm="handleDelSpecification"
          :input-delete="true"
          color=""
          border
          btn-label="Eliminar"
          btn-btn="Eliminar"
          title="Eliminar sabor"
        >
          <div class="text-5 text-center">
            Está seguro que desea eliminar este sabor?<br />
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
          to="/specification"
        />
      </div>
    </template>
  </cardForm>
  <discardChanges v-if="editSpecification" />
</template>

<script setup lang="ts">
//Vue
import { ref, computed, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
//components
import dialogConfirm from 'src/components/defaultComponents/dialog/dialogConfirm.vue';
import inputField from 'src/components/defaultComponents/inputs/inputField.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import discardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';
//Composable
import useSpecification from 'src/composables/useSpecification';
import useCategory from 'src/composables/useCategory';
//interface
import ISpecification from 'src/interfaces/Specification/ISpecification';
import cardForm from 'src/components/cardForm.vue';
// Validation
import { useValidationRule } from 'src/composables/useValidationRule';
import { Translations } from 'src/interfaces/Traslation';
import formRules from 'src/conf/rules/specification';
import ICategory from 'src/interfaces/Category/ICategory';
import { onMounted } from 'vue';
import inputSelect from 'src/components/defaultComponents/inputs/inputSelect.vue';

const editSpecification = ref(false);
const route = useRoute();
const language = ref<'English' | 'Spanish'>('English');
const loading = ref(false);
// Validation
const [
  nameEspValidate,
  nameEngValidate,
  categoryEspValidate,
  categoryEngValidate,
] = [
  formRules.nameEng,
  formRules.nameEsp,
  formRules.categoryEsp,
  formRules.categoryEng,
].map(useValidationRule);
const { getAll } = useCategory();
const [isInvalidEsp, isInvalidEng, isInvalidCategoryEsp, isInvalidCategoryEng] =
  [nameEspValidate, nameEngValidate].map((validate) => ref(validate.isInvalid));
const [
  nameEngErrorMessage,
  nameEspErrorMessage,
  categoryEspErrorMessage,
  categoryEngErrorMessage,
] = [
  nameEspValidate,
  nameEngValidate,
  categoryEspValidate,
  categoryEngValidate,
].map((validate) => ref(validate.errorMessage));

const invalidForm = computed(() => {
  return isInvalidEng.value || isInvalidEsp.value;
});
const options: Ref<ICategory[]> = ref([]);
const optionsEnglish: Ref<{ name: string; id: string }[]> = ref([]);
const optionsSpanish: Ref<{ name: string; id: string }[]> = ref([]);
const specification = ref(<ISpecification>{
  name: <Translations>{
    es: '',
    en: '',
  },
  available: true,
  category_id: '',
});
const fetchData = async () => {
  const res = await getSpecificationById(route.params.id);
  updateSpecification(res);
};

const { getSpecificationById, patchSpecification, deleteSpecification } =
  useSpecification();
watch(() => route.params.id, fetchData);
const handleEditCategory = async () => {
  validateForm();
  if (!invalidForm.value) {
    loading.value = true;
    const res = await patchSpecification(route.params.id, specification.value);
    if (res.statusCode === 400) {
      isInvalidEsp.value = true;
      isInvalidEng.value = true;
      nameEngErrorMessage.value = 'El sabor ya está registrado';
      nameEspErrorMessage.value = 'El sabor ya está registrado';
      loading.value = false;
      return;
    }
    loading.value = false;
    editSpecification.value = false;
    updateSpecification(res);
  }
};

const handleDelSpecification = async () => {
  if (!invalidForm.value) {
    loading.value = true;
    await deleteSpecification(route.params.id);
    editSpecification.value = false;
    loading.value = false;
  }
};
function validateForm() {
  const errors = [
    nameEspValidate.validate(specification.value.name.es),
    nameEngValidate.validate(specification.value.name.en),
  ];
  return !errors.some((result) => result);
}

function validateInput(input: string, lang: string) {
  const errors: Ref<(string | boolean | number)[]> = ref([]);
  if (input === 'name') {
    const { es, en } = specification.value[input];
    if (lang === 'English') errors.value = [nameEngValidate.validate(en)];
    if (lang === 'Spanish') errors.value = [nameEspValidate.validate(es)];
  }
  return !errors.value.some((result) => result);
}

const fetchCategories = async (): Promise<void> => {
  const response = await getAll({ search: '' });
  if (response) {
    options.value = response.data;
  }

  /**
   * Populates the options for English and Spanish categories.
   *
   * @type {Array<{ name: string, id: string }>}
   */

  for (const category of options.value) {
    optionsEnglish.value.push({
      name: category.name.en,
      id: category.id,
    });
    optionsSpanish.value.push({
      name: category.name.es,
      id: category.id,
    });
  }
};
onMounted(async () => {
  fetchCategories();
  fetchData();
});
const updateSpecification = (obj: ISpecification) => {
  specification.value.name = obj.name;
  specification.value.category_id = obj.categoryId;
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
