<template>
  <cardForm
    moduleName="offer"
    nameForm="Adicionar oferta"
    title="Nueva oferta"
    parentRoute="Ofertas"
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
          :model-value="offer.name.en"
          class="full-width"
          label="Nombre"
          :required="true"
          @update:modelValue="(newVal: string) => (offer.name.en = newVal)"
          :rules="formRules.nameEng"
          :isInvalidProp="isInvalidEng"
          :errorMessage="nameEngErrorMessage"
          @validate="validateInput('name', 'English')"
        />
        <inputField
          nameRef="nameEsp"
          v-if="language === 'Spanish'"
          :model-value="offer.name.es"
          class="full-width"
          label="Nombre"
          :required="true"
          @update:modelValue="(newVal: string) => (offer.name.es = newVal)"
          :rules="formRules.nameEsp"
          :isInvalidProp="isInvalidEsp"
          :errorMessage="nameEspErrorMessage"
          @validate="validateInput('name', 'Spanish')"
        />
        <inputField
          nameRef="price"
          type="number"
          :model-value="offer.price"
          class="full-width"
          label="Precio"
          @update:modelValue="(newVal: string) => (offer.price = newVal)"
          :rules="formRules.price"
          :isInvalidProp="isInvalidEng"
          @validate="validateInput('name', '')"
        />
        <inputSelect
          v-if="language === 'English'"
          class="full-width"
          placeholder="Seleccione una categoría"
          :required="true"
          :model-value="offer.subcategory_id"
          :options="optionsEnglish"
          label="Sub categoría"
          @update:modelValue="
            (newVal: string) => (offer.subcategory_id = newVal)
          "
          :rules="formRules.subcategoryEng"
          :isInvalidProp="isInvalidOfferEng"
          :errorMessage="offerEngErrorMessage"
          @validate="validateInput('subcategory', 'English')"
        />
        <inputSelect
          v-if="language === 'Spanish'"
          class="full-width"
          placeholder="Seleccione una categoría"
          @update:modelValue="
            (newVal: string) => (offer.subcategory_id = newVal)
          "
          :required="true"
          :model-value="offer.subcategory_id"
          :options="optionsSpanish"
          label="Sub categoría"
          :rules="formRules.subcategoryEsp"
          :isInvalidProp="isInvalidOfferEsp"
          :errorMessage="offerEspErrorMessage"
          @validate="validateInput('subcategory', 'Spanish')"
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
          @onClickBtn="handleAddOffer"
          :loading="loading"
        />
        <btnPrimary
          to="/offer"
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
import useOffer from 'src/composables/useOffer';
//interface
import IScategory from 'src/interfaces/Scategory/IScategory';
import IOffer from 'src/interfaces/Offer/IOffer';
import cardForm from 'src/components/cardForm.vue';
// Validation
import { useValidationRule } from 'src/composables/useValidationRule';
import { Translations } from 'src/interfaces/Traslation';
import formRules from 'src/conf/rules/offer';
import inputSelect from 'src/components/defaultComponents/inputs/inputSelect.vue';
import { useScategory } from 'src/composables';

const language = ref<'English' | 'Spanish'>('English');
const loading = ref(false);
// Validation
const [nameEspValidate, nameEngValidate, offerEspValidate, offerEngValidate] = [
  formRules.nameEng,
  formRules.nameEsp,
  formRules.price,
  formRules.subcategoryEng,
  formRules.subcategoryEsp,
].map(useValidationRule);
const { getAll } = useScategory();

const [isInvalidEsp, isInvalidEng, isInvalidOfferEsp, isInvalidOfferEng] = [
  nameEspValidate,
  nameEngValidate,
].map((validate) => ref(validate.isInvalid));
const [
  nameEngErrorMessage,
  nameEspErrorMessage,
  offerEspErrorMessage,
  offerEngErrorMessage,
] = [nameEspValidate, nameEngValidate, offerEspValidate, offerEngValidate].map(
  (validate) => ref(validate.errorMessage),
);

const invalidForm = computed(() => {
  return isInvalidEng.value || isInvalidEsp.value;
});
const { createOffer } = useOffer();
const options: Ref<IScategory[]> = ref([]);
const optionsEnglish: Ref<{ name: string; id: string }[]> = ref([]);
const optionsSpanish: Ref<{ name: string; id: string }[]> = ref([]);
const offer = ref(<IOffer>{
  name: <Translations>{
    es: '',
    en: '',
  },
  isActive: true,
  price: 0,
  subcategory_id: '',
});

const isAdd = ref(false);
async function handleAddOffer() {
  validateForm();
  if (!invalidForm.value) {
    loading.value = true;
    const res = await createOffer(offer.value);
    isAdd.value = true;
    if (res.statusCode === 400) {
      isInvalidEsp.value = true;
      isInvalidEng.value = true;
      nameEngErrorMessage.value = 'La oferta ya está registrada';
      nameEspErrorMessage.value = 'La oferta ya está registrada';
    }
    loading.value = false;
  }
}

function validateForm() {
  const errors = [
    nameEspValidate.validate(offer.value.name.es),
    nameEngValidate.validate(offer.value.name.en),
  ];
  return !errors.some((result) => result);
}

function validateInput(input: string, lang: string) {
  const errors: Ref<(string | boolean | number)[]> = ref([]);
  if (input === 'name') {
    const { es, en } = offer.value[input];
    if (lang === 'English') errors.value = [nameEngValidate.validate(en)];
    if (lang === 'Spanish') errors.value = [nameEspValidate.validate(es)];
  }
  return !errors.value.some((result) => result);
}
const fetchScategories = async (): Promise<void> => {
  const response = await getAll({ search: '' });
  if (response) {
    options.value = response.data;
  }

  /**
   * Populates the options for English and Spanish categories.
   *
   * @type {Array<{ name: string, id: string }>}
   */

  for (const subcategory of options.value) {
    optionsEnglish.value.push({
      name: subcategory.name.en,
      id: subcategory.id,
    });
    optionsSpanish.value.push({
      name: subcategory.name.es,
      id: subcategory.id,
    });
  }
};

onBeforeMount(async () => {
  fetchScategories();
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
