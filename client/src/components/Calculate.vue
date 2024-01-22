<template>
  <!-- <button @click="toggleShow">点击</button> -->
  <div class="container" v-if="show">
    <div class="header">
      <div class="sum">金额：{{ value }}</div>
      <div class="content">
        <van-field ref="inputField" v-model="text" label="备注:" placeholder="请输入备注" class="input-field"
          style="height: 1.5rem;" />
      </div>
    </div>
    <van-number-keyboard :show="show" theme="custom" extra-key="." close-button-text="完成" blur-on-confirm="true"
      :transition="true" @close="onConfirm" v-model="value" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import { useRecordsStore } from '@/store/records'
import { getCurrentYearAndMonth } from '@/config/utils'  // 引入获取当前年月的函数
import axios from '../api'
// import { showSuccessToast } from 'vant';



const store = defineProps({
  iconCostTypeIndex: {
    type: Number,
  },
  iconIncomeTypeIndex:{
    type: Number,
  }
})

const recordsStore = useRecordsStore()

const emit = defineEmits(['isShow']);



const show = ref(true);
const value = ref('');
const text = ref('');

// 获取到登录之后存在sessionStorage内的信息
const userInfoString = sessionStorage.getItem('userInfo');
const userInfo = JSON.parse(userInfoString);


const onConfirm = async () => {
  if (!isValidAmount(value.value)) {
    showToast('金额不合法');
    // 这里可以添加其他处理逻辑
  } else {
    show.value = false
    emit('isShow', show.value);
    // console.log(value.value);
    // console.log(text.value);
    // console.log(store.iconTypeIndex);

    const date = getCurrentYearAndMonth();

    recordsStore.RecordsList.push(
      {
        iconTypeIndex: store.iconTypeIndex,
        value: value.value,
        text: text.value,
        date: date,
        type: recordsStore.isPayOrIncome
      }
    )

    // 合理利用三元表达式选择两种不同的状态
    const res = await axios.post('/account', {
      user_id: userInfo.id,
      transaction_type: recordsStore.isPayOrIncome == true ? 'cost' : 'income',
      amount: value.value,
      note: text.value,
      transaction_date: date,
      iconTypeIndex:store.iconCostTypeIndex === undefined ? store.iconIncomeTypeIndex : store.iconCostTypeIndex
    })

    console.log(res);


    // showSuccessToast('记账成功！')

    console.log(recordsStore.RecordsList);

  }
};



// 判断金额是否合法
const isValidAmount = (amount: string): boolean => {
  const regex = /^\d+(\.\d{1,2})?$/; // 正则表达式，判断是否为合法金额（最多两位小数）
  return regex.test(amount);
};

// emits('isShow',ref(show.value))
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  bottom: 9rem;
  width: 100vw;
  border-top: 1px solid #c9c4c4;

  .header {
    display: flex;
    flex-direction: column;
    padding: 0.35rem;
    background-color: #fff;

    /* 为 header 添加背景颜色，使其更明显 */
    // border-top: 1px solid #c9c4c4;
    .sum {
      font-size: 0.78rem;
      font-weight: bold;
      margin-bottom: 0.16rem;
    }

    .content {
      .input-field {
        margin-bottom: 1.2rem;
        font-style: inherit;
      }
    }
  }
}
</style>
