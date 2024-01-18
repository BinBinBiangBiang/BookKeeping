<template>
  <button @click="toggleShow">点击</button>
  <div class="container" v-if="show">
    <!-- 将 van-number-keyboard 移动到这里，并设置 v-show 控制显示与隐藏 -->
    <div class="header">
      <div class="sum">金额：{{ value }}</div>
      <div class="content">
        <van-field ref="inputField" v-model="text" label="备注:" placeholder="请输入备注" class="input-field" style="height: 1.5rem;"/>
      </div>
    </div>
    <van-number-keyboard
      :show="show"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      blur-on-confirm="true"
      @input="onInput"
      :transition="true"
      @close="onConfirm"
      v-model="value"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { showToast } from 'vant';

const show = ref(false);
const value = ref('');
const text = ref('');

const toggleShow = () => {
  show.value = !show.value;
};

const onInput = (value: string) => {
  console.log(value);
};


const onConfirm = () => {
  if (!isValidAmount(value.value)) {
    showToast('金额不合法');
    // 这里可以添加其他处理逻辑
  } else {
    console.log(value.value);
    show.value = false
  }
};

// 判断金额是否合法
const isValidAmount = (amount: string): boolean => {
  const regex = /^\d+(\.\d{1,2})?$/; // 正则表达式，判断是否为合法金额（最多两位小数）
  return regex.test(amount);
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  bottom: 9.5rem;
  width: 100vw;
  border-top: 1px solid #c9c4c4;
  .header {
    display: flex;
    flex-direction: column;
    padding: 0.35rem;
    background-color: #fff; /* 为 header 添加背景颜色，使其更明显 */
    .sum {
      font-size: 0.78rem;
      font-weight: bold;
      margin-bottom: 0.16rem;
    }
  }
}
</style>
