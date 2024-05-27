/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRecordStore = defineStore('record', () => {
  const records = ref([]  );

  const setRecords = (evt: any) => {
    records.value = evt;
  };

  return {
    records,
    setRecords
  };
});
