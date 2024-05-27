<template>
  <div class="container-table">
    <tableCmp bordered row-key="id" :ref="moduleName" :columns="columns" :name-form="crudText"
      :moduleName="moduleName" :crud-action-route="true" :crudText="crudText" :crud-action-add-route="true"
       @changeSearch="inputSearch">
      <template v-slot:body-cell-all="{ props }">
        <q-td style="width: 200px;">
          <div class="btn-table" style="width: 152px;">
            <btnPrimary :to="`category/details/${props.row.id}`" text-color="secondary" class="nunito_regular"
              btnTable width label="Detalles" color="" border />
          </div>
        </q-td>
      </template>
    </tableCmp>
  </div>
</template>
<script setup lang="ts">

import tableCmp from 'src/components/defaultComponents/table/tableCmp.vue'
import { ref } from 'vue'
import btnPrimary from 'src/components/defaultComponents/buttons/btnPrimary.vue'
import { Translations } from 'src/interfaces/Traslation';

const moduleName = ref('category')
const crudText = ref('Categorías')
const searchText = ref('')

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
    format: (row: unknown) => (row as Translations)?.es +' / '+ (row as Translations)?.en,
  },
  {
    name: 'all',
    required: true,
    label: '',
    align: 'center',
    sortable: false,
  }
]

function inputSearch(evt: string) {
  searchText.value = evt
}

</script>
<style scoped></style>

