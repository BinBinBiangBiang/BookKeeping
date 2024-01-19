<template>
  <div class="container">
    <div class="title">Vip充值-10 ¥ /月</div>
    <div class="balance">{{userStore.user[i].nickname}}的余额为：¥ {{ userStore.user[i].money }}</div>
    <div class="recharge">
      <van-field
        v-model="value"
        label="余额充值："
        placeholder="请输入充值额度"
        :rules="[{ validator: checkAmount, message: '输入的金额不合法' }]"
      />
    </div>
    <div class="buyVip">
      <van-button plain type="primary" class="onConfirm" @click="onConfirm">
        余额充值
      </van-button>
      <van-button type="danger" round @click="deductBalance(i)">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="2000"
          :touchable="false"
          :show-indicators="false"
        >
          <van-swipe-item>点击充值Vip</van-swipe-item>
          <van-swipe-item>你值得拥有</van-swipe-item>
        </van-swipe>
      </van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { showFailToast, showSuccessToast, showToast } from 'vant';
import { useUserStore } from '@/store/user.ts';

// 这里暂时用i代替第一个用户，我们目前只有一个用户
const i = 0;

const userStore = useUserStore();
const value = ref<string | number>('');

const onConfirm = () => {
  const amount = parseFloat(value.value as string);

  if (!isNaN(amount) && amount >= 0) {
    userStore.addMoney(0,amount);
    value.value = '';
  } else {
    showToast('输入的金额不合法');
  }
};

const deductBalance = (i:number) => {
  if (userStore.user[i].money < 10) {
    showFailToast('您的余额不足，请先充值再购买Vip！');
  } else if (userStore.user[i].money >= 10 && userStore.user[i].vip == false){
    userStore.decreaseMoney(i);
    userStore.user[i].vip = true;
    userStore.user[i].vipName = 'Vip用户';
    console.log(userStore.user[i]);
    showSuccessToast('充值成功！');
  }else{
    showFailToast('您已经是Vip用户了!');
  }
};

const checkAmount = (rule: any, value: any, callback: (error?: Error) => void) => {
  const amount = parseFloat(value);

  if (isNaN(amount) || amount < 0) {
    callback(new Error('输入的金额不合法'));
  } else {
    callback();
  }
};
</script>

<style lang="less" scoped>
.container {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.balance {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.recharge {
  margin-bottom: 20px;
}

.buyVip {
  .onConfirm {
    background-color: #6c4642;
    margin-right: 2rem;
  }
  .van-button {
    background-color: #e74c3c; // 使用您喜欢的颜色
    color: #fff;
  }

  .notice-swipe {
    height: 40px;
    line-height: 40px;
    color: #fff; // 滑动通知的文本颜色
  }
}
</style>
