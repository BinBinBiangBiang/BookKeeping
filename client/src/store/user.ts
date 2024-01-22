import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore('user', () => {
  const user = reactive([
    {
      id:1,
      vip:false,
      vipName:'普通用户',
      money:0,
      nickname:'IKUN'
    }
  ])

  const chargeVip = (i:number) => {
    user[i].vip = true;
    user[i].vipName = 'Vip用户'
  }

  const addMoney = (i:number,money: number) => {
    user[i].money += money;
  }

  const decreaseMoney = (i:number) => {
    user[i].money -= 10;
  }

  return {
    user,
    chargeVip,
    addMoney,
    decreaseMoney
  }
});