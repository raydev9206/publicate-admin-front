<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <div class="container-page">
    <div v-if="noData" class="full-width">
      <div class="container-title relative-position">
        <div class="text-24">No existen {{ crudText }}s</div>
        <div v-if="crudActionAddRoute" style="width: 150px">
          <btnPrimary
            text-color="secondary"
            class="q-mt-lg nunito_regular"
            color=""
            border
            height
            :label="`Adicionar`"
            :to="`${moduleName}/add`"
          />
        </div>
        <LineSeparator />
      </div>
      <img class="full-width container-empty" src="/icons/empty.svg" />
    </div>
    <div v-else class="page-filters relative-position">
      <p class="text-24" style="width: 70%">{{ nameForm }}</p>
      <div v-if="crudActionAddRoute" style="width: 150px">
        <btnPrimary
          text-color="secondary"
          class="q-mt-lg nunito_regular"
          color=""
          border
          height
          :label="`Adicionar`"
          :to="`${moduleName}/add`"
        />
      </div>
      <LineSeparator />
      <div class="page-filters-buttons">
        <q-input
          outlined
          bg-color="white"
          color="secondary"
          v-model="search"
          placeholder="Search"
          debounce="500"
          borderless
          :dense="true"
          class="input-search"
          @update:model-value="changeSearch"
          @keyup.esc="cleanSearch"
          @keyup.enter="handlerSearch(search)"
        >
          <template v-slot:append>
            <q-icon
              v-if="search"
              name="close"
              @click.stop.prevent="cleanSearch"
              class="cursor-pointer"
            />
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="handlerSearch(search)"
            />
          </template>
        </q-input>
      </div>
      <!--slot to display the modal filter, this component is a child and the view with the module name is the parent -->
      <slot name="filter-modal"></slot>
      <!-- End Filter -->
    </div>
    <div v-if="!loading && !noData" class="my-table">
      <div style="width: 100%; height: calc(100vh - 320px)">
        <q-table
          :title="title"
          :rows="records"
          style="width: 100%; max-height: calc(100vh - 320px); color: #101920"
          :columns="arrayColumns"
          :row-key="rowKey"
          :flat="flat"
          :card-class="cardClass"
          :hide-header="hideHeader"
          :pagination="pagination"
          :selected="selected"
          class="my-sticky-header-table"
          :hide-bottom="records.length > 0"
        >
          <template v-if="showSlotBody" v-slot:body="props">
            <slot name="body" v-bind:props="props"></slot>
          </template>
          <template
            v-for="(header, index) in columns"
            :key="index"
            v-slot:[getNameSlotHeader(header)]
          >
            <slot :name="getNameSlotHeader(header)" v-bind:props="props">
              <q-th @click="handleSort(header.sortable ?? false)" class="">
                <div
                  :class="[
                    {
                      'justify-center': header.align === 'center',
                      'cursor-pointer': header.sortable,
                    },
                  ]"
                >
                  {{ header.label }}
                  <SortIcon v-if="header.sortable" />
                </div>
              </q-th>
            </slot>
          </template>

          <template v-slot:body-cell="row">
            <slot name="body-cell" v-bind:row="row"></slot>
          </template>
          <template
            v-for="(column, index) in columns"
            :key="index"
            v-slot:[getNameSlotCell(column)]="props"
          >
            <slot :name="getNameSlotCell(column)" v-bind:props="props">
              <q-td v-if="column.name === 'no'" class="text-left">
                {{ 1 + props.rowIndex }}
              </q-td>
              <q-td v-else class="td-class">{{
                defaultCellContent(column, props.row)
              }}</q-td>
            </slot>
          </template>

          <template v-slot:no-data>
            <div class="column" style="gap: 8px; padding: 10px">
              <span class="text-start full-width text-5-bold"
                >Sin resultados</span
              >
              <span
                class="text-start full-width"
                style="font-size: 14px; font-weight: 400; color: #101920"
              >
                No se encontraron coincidencias para su búsqueda
              </span>
            </div>
          </template>
        </q-table>
      </div>

      <div
        v-if="records.length > 0"
        class="row full-width urbanist"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
        "
      >
        <div>
          <q-pagination
            :max-pages="6"
            direction-links
            unelevated
            :max="getCantPages"
            v-model="pagination.page"
            @update:model-value="(newVal: number) => updatePag(newVal)"
            boundary-numbers
            color="white"
            text-color="secondary"
            active-color="primary-1"
            active-text-color="secondary"
          />
        </div>
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <selectPagination
            :modelValue="pagination.rowsPerPage"
            :options="optionsRowsPerPage"
            @update:modelValue="(newVal: number) => changeRows(newVal)"
            color="primary"
            class="urbanist"
          />
        </div>
      </div>
    </div>
    <!-- <img v-if="loading" class="full-width container-empty" src="/icons/empty.svg"> -->
  </div>
</template>
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import LineSeparator from 'src/components/defaultComponents/LineSeparator.vue';
import { ref, computed, toRef, onMounted } from 'vue';
import useDataLoader from './composable/tableData';
import selectPagination from '../inputs/selectPagination.vue';
import { useRecordStore } from 'src/stores/record-store';
import { Column } from 'src/interfaces/Column';
import btnPrimary from '../buttons/btnPrimary.vue';
import { onBeforeUnmount } from 'vue';
import SortIcon from 'src/assets/icons/arrows/SortIcon.vue';

const search = ref('');
function defaultCellContent(
  field: { name: string; format?: (val: unknown) => string },
  item: Column,
): string {
  const { name, format } = field;
  // @ts-ignore
  const value = item[name];
  const toStr = format || (JSON.stringify as (val: unknown) => string);
  return Array.isArray(value)
    ? value.map(toStr).join(', ')
    : typeof value === 'object'
      ? toStr(value)
      : value;
}

const props = defineProps({
  columns: { type: Array<Column>, default: [] },
  cardClass: { type: String, default: '' },
  crudText: { type: String, default: '' },
  crudActionRoute: { type: Boolean, default: true },
  crudActionAddRoute: { type: Boolean, default: true },
  filters: { type: Object },
  flat: { type: Boolean, default: false },
  hideHeader: { type: Boolean, default: false },
  moduleName: { type: String, default: '' },
  nameForm: { type: String, default: '' },
  propertySearch: { type: String, default: 'name' },
  rowKey: { type: String, default: 'id' },
  selection: { type: String, default: '' },
  showSlotBody: { type: Boolean, default: false },
  textFieldSearch: { type: String, default: 'Buscar' },
  title: { type: String, default: '' },
  visibleAdd: { type: Boolean, default: true },
  visibleEdit: { type: Boolean, default: true },
  visibleDel: { type: Boolean, default: true },
});

const optionsRowsPerPage = ref([10, 20, 30]);

const firstLoad = toRef(true);
const arrayColumns = toRef(props.columns);
const {
  loading,
  pagination,
  getCantPages,
  loadData,
  getNameSlotCell,
  getNameSlotHeader,
  changeRows,
  updatePag,
  handlerSearch,
  changeSearch,
  handleSort,
} = useDataLoader(props.moduleName, search.value);
const selected = ref([]);
const storeRecords = useRecordStore();
const records = computed(() => storeRecords.records);
const noData = ref(false);

onMounted(async () => {
  await loadData(true);
  noData.value = records.value.length <= 0;
  firstLoad.value = false;
});

onBeforeUnmount(() => {
  arrayColumns.value = [];
  firstLoad.value = true;
});

async function cleanSearch() {
  emit('changeSearch', search.value);
  search.value = '';
  await handlerSearch(search.value);
}

const emit = defineEmits<{
  (e: 'showModal', value: boolean): void;
  (e: 'changeSearch', value: string): void;
  (e: 'sort'): void;
}>();
</script>

<style scope>
.q-table tbody td {
  font-size: 14px;
  height: 68px;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: #ededed;
}

/* .my-sticky-header-table {
  height: 310px;
  max-height: calc(100vh - 250px);
} */

.my-sticky-header-table .q-table__top,
.my-sticky-header-table thead tr:first-child th {
  background-color: #f6f6f6;
  color: #101920;
  border: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 19.1px;
  font-family: 'nunito_regular';
}

.my-sticky-header-table thead tr th {
  position: sticky;
  z-index: 1;
}

.my-sticky-header-table thead tr:first-child th {
  top: 0;
}

.my-sticky-header-table.q-table--loading thead tr:last-child th {
  top: 48px;
}

.my-sticky-header-table tbody {
  scroll-margin-top: 68px;
  font-size: 14px;
  line-height: 19.1px;
}

.inputClass,
.paginationClass,
.buttonsClass,
.filterButtons {
  width: 300px;
  border-radius: 10px;
  border: 1px solid var(--PRIMARIO-60-P, #333132);
  background: #fff;
}

.q-table thead tr,
.q-table tbody td {
  height: 68px;
  background: #ffffff;
}

.q-table thead tr th div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.q-btn:before {
  box-shadow: none;
}

.q-pagination__content {
  --q-pagination-gutter-parent: -2px;
  --q-pagination-gutter-child: 4px;
}

.q-table__card {
  filter: drop-shadow(0 1 2 rgb(16, 25, 32, 0.2));
  box-shadow: none;
  border-radius: 8px;
  background: transparent;
  border-radius: 10px;
  overflow: hidden;
}

.q-table__bottom {
  background: #fff;
}

.q-pagination__content .q-btn--rectangle {
  border-radius: 10px;
  height: 32px;
  width: 32px;
}

.q-pagination__content .q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 28px;
  height: 32px;
  min-height: 32px;
}

.q-field--outlined.q-field--rounded .q-field__control {
  width: 96px;
}

.q-field--auto-height.q-field--dense .q-field__control,
.q-field--auto-height.q-field--dense .q-field__native {
  min-height: 32px;
}

.my-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
