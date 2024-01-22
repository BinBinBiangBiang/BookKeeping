<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header-title">
          <i class="iconfont icon-13" @click="goChat"></i>
          <p class="header-title-text">冰冰记账</p>
        </div>
        <div class="header-data">
          <div class="header-data-time" @click="changeMonth">
            <div><span class="header-data-time-year">{{state.year}}年</span></div>
            <div><span class="header-data-time-month">{{state.month}}<i class="month">月</i><van-icon name="arrow-down" /></span></div>
          </div>
          <span class="fuhao">|</span>
          <div class="header-data-make">
            <span class="header-data-make-title">收入</span>
            <span class="header-data-make-value">0.00</span>
          </div>
          <div class="header-data-cost">
            <span class="header-data-cost-title">支出</span>
            <span class="header-data-cost-value">0.00</span>
          </div>
        </div>
        <div class="tabs">
          <div class="tabs-item" @click="onTabBill">
            <i class="iconfont icon-zhangdan"></i>
            <p>账单</p>
          </div>
          <div class="tabs-item" @click="onTabBudget">
            <i class="iconfont icon-yusuan"></i>
            <p>预算</p>
          </div>
          <div class="tabs-item" @click="onTabAsset">
            <i class="iconfont icon-zichanguanjia"></i>
            <p>资产管家</p>
          </div>
          <div class="tabs-item" @click="onTabRefund">
            <i class="iconfont icon-fanxian"></i>
            <p>购物返现</p>
          </div>
        </div>
      </div>
      <div class="content">
        <van-pull-refresh
            v-model="loading"
            @refresh="onRefresh"
            success-text="刷新成功"
            pulling-text="下拉查看上月账单"
            loosing-text="释放即可刷新"
            loading-text="加载中.."
            head-height="65"
            class="vantRefresh"
        >
          <p>刷新次数: {{ count }}</p>
        </van-pull-refresh>
      </div>
    </div>
    <div v-if="state.showChooseTime">
      <ChooseTime ref="childRef" @date-selected="handleDateSelected"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { reactive,ref } from 'vue'
import ChooseTime from '@/components/ChooseTime.vue'
import OneRecord from '@/components/OneRecord.vue'
import { showToast } from 'vant';
import axios from '@/api';


const router = useRouter()

interface DateSelection {
  year: string;
  month: string;
}

// const list = ref([]);
const state = reactive({
  loading: false,
  finished: false,
  year:'2023',
  month:'12',
  showChooseTime:true
})

// 获取用户登录后的信息，这里主要是拿id
const userInfoString = sessionStorage.getItem('userInfo');
const userInfo = JSON.parse(userInfoString);

// const chooseTime = () => {
//   console.log();
  
// }

const count = ref(0);
const loading = ref(true);
const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功');
    loading.value = false;
    count.value++;
  }, 1000);
};


const selectedDate = ref({ year: '', month: '' });

const handleDateSelected = async(date:DateSelection) => {
  selectedDate.value = { ...date };
  state.year = selectedDate.value.year;
  state.month =selectedDate.value.month;
  const result = await axios.post('/date', {
    user_id:userInfo.id,
    year:state.year,
    month:state.month
  })
  console.log(result);
  
  // 更新其他需要的显示
};


const goChat = () => {
  router.push('/chat')
}

const childRef = ref<any>();

const changeMonth = () =>{
  state.showChooseTime = true;
  childRef.value.show = true;
  childRef.value.showBottom = true;
}

// tabs 四个地方的跳转
const onTabBill = () => {
  router.push('/cost/bill')
}

const onTabBudget = () => {
  router.push('/cost/budget')
}

const onTabAsset = () => {
  router.push('/cost/assetManager')
}

const onTabRefund = () => {
  router.push('/cost/shoppingCashback')
}
</script>

<style lang="less" scoped>
.container {
  // height: 100vh;
  
  .main {
    // height: 100%;
    // overflow: auto;
    box-sizing: border-box;
    .header {
      height: 7rem;
      // position: fixed;
      top: 0;
      background: rgb(154, 243, 65);
      z-index: 999;
      .header-data {
        display: flex;
        padding-bottom: 0.3rem;
        align-items: center;
        .header-data-time{
          margin-left: 0.5rem;
          margin-right: 0.5rem;
          width: 2.5rem;
          .header-data-time-year{
            font-size: 0.5rem;
            color: #736868;
            padding-bottom: 0.2rem;
          }
          .header-data-time-month{
            font-size: 0.9rem;
            color: #131111;
            padding-bottom: 0.2rem;
            .month{
              font-size: 0.5rem;
            }
          }
        }
        .fuhao{
          color: #736868;
          margin-top: 0.5rem;
        }
        .header-data-make{
          margin-left: 0.6rem;
          display: flex;
          flex-direction: column;
          .header-data-make-title{
            font-size: 0.5rem;
            color: #736868;
            margin-top: 0.4rem;
            padding-bottom: 0.2rem;
          }
          .header-data-make-value{
            font-size: 0.8rem;
            color: #131111;
          }
        }
        .header-data-cost{
          margin-left: 0.6rem;
          display: flex;
          flex-direction: column;
          margin-left: 4rem;
          .header-data-cost-title{
            font-size: 0.5rem;
            color: #736868;
            margin-top: 0.4rem;
            padding-bottom: 0.2rem;
          }
          .header-data-cost-value{
            font-size: 0.8rem;
            color: #131111;
          }
        }
      }

      .header-title {
        height: 2rem;
        width: 100vw;
        display: flex;
        align-items: center;

        p {
          width: 100%;
          text-align: center;
        }

        .icon-13 {
          font-size: 1rem;
          position: absolute;
          float: left;
          margin-left: 0.5rem;
        }

        .header-title-text {
          font-size: 1.3rem;
          font-family: 隶书;
        }
      }

      .tabs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 80%;
        height: 2.5rem;
        margin: 0 1rem 0 1rem;
        position: absolute;
        border-radius: 8px;
        background: #fff;
        padding: 0.2rem 0.5rem;
        box-shadow: 0 0 0.1px inset;
        .tabs-item {
          flex: 1;
          display: flex;
          justify-content: space-evenly;
          flex-direction: column;
          align-items: center;
          color: #736868;

          i {
            font-size: 1.2rem;
            margin-bottom: 0.2rem;
          }

          p {
            font-size: 0.5rem;
            font-family: 隶书;
          }
        }
      }
    }

    .content {
      height: 100%;
      // overflow: hidden;
      width: 100%;
      z-index: -1;
      height: 20rem;
      .vantRefresh{
        height: 100%;
      }
    }
  }
}
</style>