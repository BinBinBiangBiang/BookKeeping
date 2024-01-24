<template>
  <div class="container">
    <div class="header">
      <div class="back" @click="goBack">返回</div>
      <div class="function">
        <div class="function-pay" @click="pay" :class="{ 'bottom': isPaySelected }">支出</div>
        <div class="function-income" @click="cost" :class="{ 'bottom': isIncomeSelected }">收入</div>
      </div>
    </div>
    <AccountPay v-if="recordsState.isPayOrIncome"/>
    <AccountInCome v-else/>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import AccountPay from './AccountPay.vue'
import AccountInCome from './AccountIncome.vue'
import { useRecordsStore } from '@/store/records'
import { useRouter } from 'vue-router';


const router = useRouter();

const isPaySelected = ref(true)  // 选中的支出
const isIncomeSelected = ref(false) // 选中的收入

const recordsState = useRecordsStore()



const pay = ()=>{
  isPaySelected.value = true
  isIncomeSelected.value = false
  recordsState.isPayOrIncome = true
}


const cost = ()=>{
  isIncomeSelected.value = true
  isPaySelected.value = false
  recordsState.isPayOrIncome = false
}

const goBack = () =>{
  router.push('/cost')
}
</script>

<style lang="less" scoped>
.container {
  .header {
    // 使用 position: sticky;，这样在页面滚动时元素会保持在视图的顶部，而不需要使用 position: fixed;
    // 使用position: fixed; 在页面初次加载时可能会有一些渲染的延迟。这可能导致元素一开始不会立即跳到头部，而是在稍后的某个时刻才跳到正确的位置。
    position: sticky;
    top: 0;
    width: 100vw;
    height: 2rem;
    background: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    // overflow: auto;
    .back{
      position: absolute;
      left: 0.7rem;
      font-size: 0.7rem;
    }
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