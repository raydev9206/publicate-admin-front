/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, Ref, computed } from 'vue';
import { Loading, QSpinnerTail } from 'quasar';
import { useRecordStore } from 'src/stores/record-store';
import * as composables from 'src/composables';
//import { Pagination } from 'src/interfaces/Pagination';
import { Column } from 'src/interfaces/Column';
interface Composables {
  [key: string]: () => any; // Define the structure of the composable functions
}

export default function useDataLoader(
  moduleName: string = '',
  search: string = '',
) {
  const selected: Ref<any[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const storeRecords = useRecordStore();
  const functionName = `use${moduleName.charAt(0).toUpperCase()}${moduleName.slice(1)}`;
  const composableFunction = (composables as unknown as Composables)[
    functionName
  ]();

  const pagination = ref({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  });

  const baseParams = ref({
    skip: pagination.value.page ,
    take: pagination.value.rowsPerPage,
    search: search ? search : '',
  });

  function getNameSlotCell(column: Column): string {
    return column && column.name ? `body-cell-${column.name}` : '';
  }
  function getNameSlotHeader(column: Column): string {
    return column && column.name ? `header-cell-${column.name}` : '';
  }

  async function changeRowsPerPage(value: number) {
    pagination.value.rowsPerPage = value;
    loadData();
  }
  async function updatePagination(value: number) {
    pagination.value.page = value;
    loadData();
  }

  function handleApplyFilters() {
    loadData();
  }

  const getCantPages = computed(() => {
    let pages = pagination.value.rowsNumber / pagination.value.rowsPerPage;

    return pagination.value.rowsNumber % pagination.value.rowsPerPage !== 0
      ? ++pages
      : pages;
  });

  async function loadData(firstLoad: boolean = false): Promise<void> {
    loading.value = true;
    if (firstLoad) storeRecords.setRecords([]);
    if (composableFunction) {
      try {
        Loading.show({
          spinner: QSpinnerTail,
          spinnerSize: 140,
          backgroundColor: 'blue',
          message: 'Search information...',
          messageColor: 'black',
        });

        const response = await composableFunction.getAll(baseParams.value);

        Loading.hide();
        storeRecords.setRecords(response.data);
        pagination.value.rowsNumber = response.total;
      } catch (error) {
        loading.value = false;
        Loading.hide();
        storeRecords.setRecords([]);
        pagination.value.rowsNumber = 0;
      } finally {
        loading.value = false;
      }
    } else {
      console.error(`Composable function ${functionName} not found`);
    }
  }

  function convertString(select: any): any {
    const selectedCopy = { ...select };
    const result: any = {};
    Object.keys(selectedCopy).map((x) => {
      if (typeof selectedCopy[x] === 'object') {
        result[x] = JSON.stringify(selectedCopy[x]);
      } else {
        result[x] = selectedCopy[x];
      }
    });
    return result;
  }

  async function changeRows(value: number) {
    pagination.value.rowsPerPage = value;
    baseParams.value.take = value;
    await loadData();
  }

  async function updatePag(value: number) {
    pagination.value.page = value;
    baseParams.value.skip = value;
    await loadData();
  }

  async function handlerSearch(search: string) {
    pagination.value.page = 1;
    baseParams.value.skip = 1;
    baseParams.value.search = search;
    await loadData();
  }

  async function cleanSearch(): Promise<void> {
    baseParams.value.search = '';
    await loadData();
  }

  function changeSearch() {
    //emit('changeSearch', search)
  }

  function handleSort(value: boolean) {
    if (value) console.log(value);
  }

  return {
    selected,
    loading,
    pagination,
    getCantPages,
    handlerSearch,
    handleSort,
    updatePag,
    cleanSearch,
    changeSearch,
    changeRows,
    getNameSlotCell,
    getNameSlotHeader,
    changeRowsPerPage,
    handleApplyFilters,
    loadData,
    convertString,
    updatePagination,
  };
}
