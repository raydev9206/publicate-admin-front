<template>
  <cardForm moduleName="category" nameForm="Adicionar categoría" title="Nueva categoría" parentRoute="Categorías">
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
        <inputField nameRef="nameEng" v-if="language === 'English'" :model-value="category.name.en"
          class="full-width" label="Nombre" :required="true"
          @update:modelValue="(newVal: string) => category.name.en = newVal" :rules="formRules.nameEng"
          :isInvalidProp="isInvalidEng" :errorMessage="nameEngErrorMessage"
          @validate="validateInput('name', 'English')" />
        <inputField nameRef="nameEsp" v-if="language === 'Spanish'" :model-value="category.name.es"
          class="full-width" label="Nombre" :required="true"
          @update:modelValue="(newVal: string) => category.name.es = newVal" :rules="formRules.nameEsp"
          :isInvalidProp="isInvalidEsp" :errorMessage="nameEspErrorMessage"
          @validate="validateInput('name', 'Spanish')" />
          <inputField nameRef="order" type="number" :model-value="category.order"
          class="full-width" label="Orden"
          @update:modelValue="(newVal: string) => category.order = newVal" :rules="formRules.order"
          :isInvalidProp="isInvalidEng" :errorMessage="orderErrorMessage"
          @validate="validateInput('name', 'English')" />
      </div>
    </template>
    <template #buttons>
      <div class="container-buttons">
        <btnPrimary text-color="secondary" class="q-mt-lg nunito_regular" height width label="Guardar"
          @onClickBtn="handleAddCategory" :loading="loading" />
        <btnPrimary to="/category" text-color="secondary" class="q-mt-lg nunito_regular" color="" height width border
          label="Cancelar" />
      </div>
    </template>
  </cardForm>
  <discardChanges v-if="!isAdd"/>
</template>

<script setup lang="ts">
//Vue
import { ref, computed, Ref } from 'vue';
//components
import inputField from 'src/components/defaultComponents/inputs/inputField.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import discardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';
//Composable
import useCategory from 'src/composables/useCategory';
//interface
import ICategory from 'src/interfaces/Category/ICategory';
import cardForm from 'src/components/cardForm.vue';
// Validation
import { useValidationRule } from 'src/composables/useValidationRule';
import { Translations } from 'src/interfaces/Traslation';
import formRules from 'src/conf/rules/category'

const language = ref<'English' | 'Spanish'>('English');
const loading = ref(false)
// Validation
const [nameEspValidate, nameEngValidate, orderValidate] = [formRules.nameEng, formRules.nameEsp, formRules.order].map(useValidationRule)
const [isInvalidEsp, isInvalidEng, isInvalidOrder] = [nameEspValidate, nameEngValidate, orderValidate].map(validate => ref(validate.isInvalid))
const [nameEngErrorMessage, nameEspErrorMessage, orderErrorMessage] = [nameEspValidate, nameEngValidate, orderValidate].map(validate => ref(validate.errorMessage))

const invalidForm = computed(() => {
  return isInvalidEng.value || isInvalidEsp.value || isInvalidOrder.value;
});
const { createCategory } = useCategory()

const category = ref(<ICategory>{
  name: <Translations>{
    es: '',
    en: '',
  },
  isActive: true,
  order: 0,
})

const isAdd = ref(false)
async function handleAddCategory() {
  validateForm()
  if (!invalidForm.value) {
    loading.value = true;
    const res = await createCategory(category.value)
    isAdd.value = true
    if (res.statusCode === 403) {
      isInvalidEsp.value = true
      isInvalidEng.value = true
      nameEngErrorMessage.value = 'La categoría ya está registrada'
      nameEspErrorMessage.value = 'La categoría ya está registrada'
    }
    loading.value = false;
  }
}

function validateForm() {
  const errors = [
    nameEspValidate.validate(category.value.name.es),
    nameEngValidate.validate(category.value.name.en),
  ]
  return !errors.some((result) => result);
};

function validateInput(input: string, lang: string) {
  const errors: Ref<(string | boolean | number)[]> = ref([])
  if (input === 'name') {
    const { es, en } = category.value[input]
    if (lang === 'English') errors.value = [nameEngValidate.validate(en)]
    if (lang === 'Spanish') errors.value = [nameEspValidate.validate(es)]
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
