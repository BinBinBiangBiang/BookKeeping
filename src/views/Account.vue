<template>
  <div class="container">
    <div class="header">
      <div class="function">
        <div class="function-pay" @click="pay" :class="{ 'bottom': isPaySelected }">支出</div>
        <div class="function-income" @click="cost" :class="{ 'bottom': isIncomeSelected }">收入</div>
      </div>
    </div>
    <AccountPay/>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import AccountPay from './AccountPay.vue'

const isPaySelected = ref(true)
const isIncomeSelected = ref(false)

const pay = ()=>{
  isPaySelected.value = true
  isIncomeSelected.value = false
}


const cost = ()=>{
  isIncomeSelected.value = true
  isPaySelected.value = false
}
</script>

<style lang="less" scoped>
.container {
  .header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 2rem;
    background: #9ce124;
    display: flex;
    justify-content: center;
    align-items: center;
    .function {
      display: flex;
      font-size: 0.9rem;
      height: 100%;
      .function-pay{
        display: flex;
        align-items: center;
        margin-right: 0.5rem;
      }
      .function-income{
        display: flex;
        align-items: center;
        margin-left: 0.5rem;
      }
    }
  }
}

.bottom{
  border-bottom: #0d0d0d solid 0.08rem;
}
</style>