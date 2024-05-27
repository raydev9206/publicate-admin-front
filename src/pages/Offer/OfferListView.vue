<template>
  <div class="container-table">
    <tableCmp
      bordered
      row-key="id"
      :ref="moduleName"
      :columns="columns"
      :name-form="crudText"
      :moduleName="moduleName"
      :crud-action-route="true"
      :crudText="crudText"
      :crud-action-add-route="true"
      @changeSearch="inputSearch"
    >
      <template v-slot:body-cell-all="{ props }">
        <q-td >
          <div class="btn-table">
            <div class="row" style="width: 200px">
              <div class="col">
                <btnPrimary
                  @click="change(props.row, false)"
                  v-if="props.row.available"
                  style="width: 72px"
                  text-color="secondary"
                  class="nunito_regular"
                  btnTable
                  width
                  label="Quitar"
                  color=""
                  border
                >
                </btnPrimary>
                <btnPrimary
                  v-else
                  @click="change(props.row, true)"
                  style="width: 72px"
                  text-color="secondary"
                  class="nunito_regular"
                  btnTable
                  width
                  label="Publicar"
                  color=""
                  border
                />
              </div>
              <div class="col">
                <btnPrimary
                  style="width: 152px"
                  :to="`offer/details/${props.row.id}`"
                  text-color="secondary"
                  class="nunito_regular"
                  btnTable
                  width
                  label="Detalles"
                  color=""
                  border
                />
              </div>
            </div>
          </div>
        </q-td>
      </template>
    </tableCmp>
  </div>
</template>
<script setup lang="ts">
import tableCmp from 'src/components/defaultComponents/table/tableCmp.vue';
import { ref } from 'vue';
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue';
import { Translations } from 'src/interfaces/Traslation';
import IOffer from 'src/interfaces/Offer/IOffer';
import { useOffer } from 'src/composables';

const moduleName = ref('offer');
const crudText = ref('Ofertas');
const searchText = ref('');

const loading = ref(false);
const offer = ref(<IOffer>{
  name: <Translations>{
    es: '',
    en: '',
  },
  isActive: true,
  price: 0,
  subcategory_id: '',
});

const { patchOffer } = useOffer();
async function change(obj: IOffer, value: boolean) {
  offer.value.name = obj.name;
  offer.value.price = obj.price;
  offer.value.subcategory_id = obj.subcategory_id;
  offer.value.available = value;

  loading.value = true;
  await patchOffer(obj.id, offer.value, false);
  loading.value = false;
}

const columns = [
  {
    name: 'no',
    required: true,
    label: 'No.',
    align: 'left',
  },
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    sortable: true,
    format: (row: unknown) =>
      (row as Translations)?.es + ' / ' + (row as Translations)?.en,
  },
  {
    name: 'all',
    required: true,
    label: '',
    align: 'center',
    sortable: false,
  },
];

function inputSearch(evt: string) {
  searchText.value = evt;
}
</script>
<style scoped></style>
