<template>
  <div class="container-table">
    <tableCmp bordered row-key="id" :ref="moduleName" :columns="columns" :name-form="crudText"
      :moduleName="moduleName" :crud-action-route="true" :crudText="crudText" :crud-action-add-route="true"
       @changeSearch="inputSearch">
    </tableCmp>
  </div>
</template>
<script setup lang="ts">

import tableCmp from 'src/components/defaultComponents/table/tableCmp.vue'
import { ref } from 'vue'
import { Translations } from 'src/interfaces/Traslation';

const moduleName = ref('user')
const crudText = ref('Usuario')
const searchText = ref('')

const columns = [
  {
    name: 'no',
    required: true,
    label: 'No.',
    align: 'left',
  },
  {
    name: 'username',
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

