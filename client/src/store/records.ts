import { defineStore } from "pinia";
import { ref } from 'vue' 

interface Record {
  iconTypeIndex: number | undefined;
  value: string;
  text: string;
  date: string;
  type:boolean;
}

export const useRecordsStore = defineStore('recordsStore',()=>{
  const RecordsList = ref<Record[]>([]);
  const isPayOrIncome = ref(true);
  return {
    RecordsList,
    isPayOrIncome,
  }
})