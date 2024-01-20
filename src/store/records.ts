import { defineStore } from "pinia";
import { ref } from 'vue' 

interface CostRecord {
  iconTypeIndex: number | undefined;
  value: string;
  text: string;
}

export const useRecordsStore = defineStore('recordsStore',()=>{
  const costRecordsList = ref<CostRecord[]>([]);
  return {
    costRecordsList
  }
})