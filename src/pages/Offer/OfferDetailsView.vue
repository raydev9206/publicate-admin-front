<template>
  <cardForm
    moduleName="offer"
    nameForm="Detalles"
    :title="!editOffer ? 'Detalles de oferta' : 'Editar oferta'"
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
          :disable="!editOffer"
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
          :disable="!editOffer"
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
          :disable="!editOffer"
          @update:modelValue="(newVal: string) => (offer.price = newVal)"
          :rules="formRules.price"
          :isInvalidProp="isInvalidEng"
          @validate="validateInput('name', 'English')"
        />
        <inputSelect
          v-if="language === 'English'"
          class="full-width"
          placeholder="Seleccione una sub categoría"
          :required="true"
          :model-value="offer.subcategory_id"
          :options="optionsEnglish"
          label="Sub categoría"
          :disable="!editOffer"
          @update:modelValue="
            (newVal: string) => (offer.subcategory_id = newVal)
          "
          :rules="formRules.subcategoryEng"
          :isInvalidProp="isInvalidCategoryEng"
          :errorMessage="subcategoryEngErrorMessage"
          @validate="validateInput('category', 'English')"
        />
        <inputSelect
          v-if="language === 'Spanish'"
          class="full-width"
          placeholder="Seleccione una sub categoría"
          @update:modelValue="
            (newVal: string) => (offer.subcategory_id = newVal)
          "
          :required="true"
          :model-value="offer.subcategory_id"
          :options="optionsSpanish"
          label="Sub categoría"
          :disable="!editOffer"
          :rules="formRules.subcategoryEsp"
          :isInvalidProp="isInvalidCategoryEsp"
          :errorMessage="subcategoryEspErrorMessage"
          @validate="validateInput('category', 'Spanish')"
        />
      </div>
    </template>
    <template #buttons>
      <div class="container-buttons">
        <btnPrimary
          v-if="editOffer"
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
          @confirm="editOffer = true"
          btn-label="Editar"
          btn-btn="Confirmar"
          title="Editar categoría"
          description="Está seguro que desea editar esta categoría?"
        />
        <dialogConfirm
          @confirm="handleDelOffer"
          :input-delete="true"
          color=""
          border
          btn-label="Eliminar"
          btn-btn="Eliminar"
          title="Eliminar oferta"
        >
          <div class="text-5 text-center">
            Está seguro que desea eliminar esta oferta?<br />
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
          to="/offer"
        />
      </div>
    </template>
  </cardForm>
  <discardChanges v-if="editOffer" />
</template>

<script setup lang="ts">
//Vue
import { ref, computed, Ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
//components
import dialogConfirm from 'src/components/defaultComponents/dialog/dialogConfirm.vue';
import inputField from 'src/components/defaultComponents/inputs/inputField.vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import discardChanges from 'src/components/defaultComponents/dialog/discardChanges.vue';
//Composable
import useOffer from 'src/composables/useOffer';
import useScategory from 'src/composables/useScategory';
//interface
import IOffer from 'src/interfaces/Offer/IOffer';
import cardForm from 'src/components/cardForm.vue';
// Validation
import { useValidationRule } from 'src/composables/useValidationRule';
import { Translations } from 'src/interfaces/Traslation';
import formRules from 'src/conf/rules/offer';
import IScategory from 'src/interfaces/Scategory/IScategory';
import inputSelect from 'src/components/defaultComponents/inputs/inputSelect.vue';

const editOffer = ref(false);
const route = useRoute();
const language = ref<'English' | 'Spanish'>('English');
const loading = ref(false);
// Validation
const [
  nameEspValidate,
  nameEngValidate,
  subcategoryEspValidate,
  subcategoryEngValidate,
] = [
  formRules.nameEng,
  formRules.nameEsp,
  formRules.price,
  formRules.subcategoryEsp,
  formRules.subcategoryEng,
].map(useValidationRule);
const { getAll } = useScategory();
const [isInvalidEsp, isInvalidEng, isInvalidCategoryEsp, isInvalidCategoryEng] =
  [nameEspValidate, nameEngValidate].map((validate) => ref(validate.isInvalid));
const [
  nameEngErrorMessage,
  nameEspErrorMessage,
  subcategoryEspErrorMessage,
  subcategoryEngErrorMessage,
] = [
  nameEspValidate,
  nameEngValidate,
  subcategoryEspValidate,
  subcategoryEngValidate,
].map((validate) => ref(validate.errorMessage));

const invalidForm = computed(() => {
  return isInvalidEng.value || isInvalidEsp.value;
});
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

const { getOfferById, patchOffer, deleteOffer } = useOffer();
const handleEditCategory = async () => {
  validateForm();
  if (!invalidForm.value) {
    loading.value = true;
    const res = await patchOffer(route.params.id, offer.value);
    if (res.statusCode === 400) {
      isInvalidEsp.value = true;
      isInvalidEng.value = true;
      nameEngErrorMessage.value = 'La oferta ya está registrada';
      nameEspErrorMessage.value = 'La oferta ya está registrada';
      loading.value = false;
      return;
    }
    loading.value = false;
    editOffer.value = false;
  }
};

const handleDelOffer = async () => {
  if (!invalidForm.value) {
    loading.value = true;
    await deleteOffer(route.params.id);
    editOffer.value = false;
    loading.value = false;
  }
};
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

const fetchScategory = async () => {
  const response = await getAll({ search: '' });
  if (response) {
    options.value = response.data;
  }

  for (const scategory of options.value) {
    optionsEnglish.value.push({
      name: scategory.name.en,
      id: scategory.id,
    });
    optionsSpanish.value.push({
      name: scategory.name.es,
      id: scategory.id,
    });
  }
};

onBeforeMount(async () => {
  await fetchScategory();
  const res = await getOfferById(route.params.id);
  offer.value.name = res.name;
  offer.value.subcategory_id = res.subcategoryId;
  offer.value.price = res.price;
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
