<template>
  <div class="container">
    <div class="header">
      <div class="back" @click="goBack">返回</div>
    </div>
    <div class="title">Vip充值-10 ¥ /月</div>
    <div class="balance">{{ userInfo.nickname }}的余额为：¥ {{ money }}</div>
    <div class="recharge">
      <van-field v-model="value" label="余额充值：" placeholder="请输入充值额度"
        :rules="[{ validator: checkAmount, message: '输入的金额不合法' }]" />
    </div>
    <div class="buyVip">
      <van-button plain type="primary" class="onConfirm" @click="onConfirm">
        余额充值
      </van-button>
      <van-button type="danger" round @click="deductBalance()">
        <van-swipe vertical class="notice-swipe" :autoplay="2000" :touchable="false" :show-indicators="false">
          <van-swipe-item>点击充值Vip</van-swipe-item>
          <van-swipe-item>你值得拥有</van-swipe-item>
        </van-swipe>
      </van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { showFailToast, showSuccessToast, showToast } from 'vant';
import axios from '@/api'
import { useRouter } from 'vue-router';


// 获取用户登录后的信息，这里主要是拿id
const userInfoString = sessionStorage.getItem('userInfo');
const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

const money = ref('')

const router = useRouter()


const goBack = () => {
  router.push('/my')
}


onMounted(async () => {
  const res = await axios.post('/findMoney', {
    id: userInfo.id
  })
  money.value = res.data
})


const value = ref<string | number>('');

const onConfirm = async () => {
  const amount = parseFloat(value.value as string);
  if( amount > 100000){
      showFailToast('余额充值失败，单次充值不能超过100000元哦');
      return
    }

  if (!isNaN(amount) && amount >= 0) {
    if(Number((parseFloat(money.value) + amount).toFixed(2)) > 1000000000000){
      showFailToast('余额充值失败，总余额不能超过1000000000000元哦');
      return
    }
    // 更新前端显示的余额
    money.value = (parseFloat(money.value) + amount).toFixed(2);

    

    // 调用后端接口，将充值后的余额同步到数据库中
    const res = await axios.post('/alterMoney', {
      id: userInfo.id,
      money: money.value
    });

    console.log(res);


    if (res.data.code === 'success') {
      console.error('余额充值成功，但同步到数据库时发生错误:', res.data);
      showFailToast('充值失败，服务器异常');
      // 其他逻辑，例如显示失败提示
    } else {
      console.log('余额充值成功，已同步到数据库');
      showSuccessToast('充值成功！');
      // 其他逻辑，例如显示成功提示
    }


    value.value = ''; // 清空充值输入框
  } else {
    showToast('输入的金额不合法');
  }
};


const deductBalance = async () => {
  const currentMoney = parseFloat(money.value);

  if (isNaN(currentMoney) || currentMoney < 10) {
    showFailToast('您的余额不足，请先充值再购买Vip！');
  } else {
    // 扣减10元
    money.value = (currentMoney - 10).toFixed(2); // 保留两位小数

    // 调用后端接口，将扣减后的余额同步到数据库中
    const res = await axios.post('/alterMoney', {
      id: userInfo.id,
      money: money.value
    });

    const res2 = await axios.post('/alterVip', {
      id: userInfo.id,
      isVip: true,
      userType: '会员用户'
    })


    if (res.data === 'success' && res2.data === 'success') {
      // 在需要的地方更新userInfo
      userInfo.isVip = true;
      userInfo.userType = '会员用户'; // 更新userType

      // 将更新后的userInfo重新存入sessionStorage  直接修改sessionStorage是不安全的，建议后端来改
      // 但我这里为了方便（少写一个接口）就直接改了
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log('余额扣减成功，余额和用户信息已同步到数据库');
      showSuccessToast('续费成功！');
    } else {
      console.error('余额扣减成功，但同步到数据库时发生错误:', res.data);
      showFailToast('续费失败，服务器异常');
    }
  }
};




const checkAmount = (value: any, callback: (error?: Error) => void) => {
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

  .header {
    width: 100vw;
    height: 2rem;

    .back {
      position: absolute;
      top: 10px;
      left: 10px;
      cursor: pointer;
      color: #4285f4;
    }
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
}
</style>
