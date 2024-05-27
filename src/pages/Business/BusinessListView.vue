<template>
  <div class="container-table">
    <tableCmp bordered row-key="id" :ref="moduleName" :columns="columns" :name-form="crudText"
      :moduleName="moduleName" :crud-action-route="true" :crudText="crudText" :crud-action-add-route="true"
       @changeSearch="inputSearch">
      <template v-slot:body-cell-all="{ props }">
        <q-td style="width: 200px;">
          <div class="btn-table" style="width: 152px;">
            <btnPrimary :to="`business/details/${props.row.id}`" text-color="secondary" class="nunito_regular"
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

const moduleName = ref('business')
const crudText = ref('Negocios')
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

