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
            <span class="header-data-make-value">{{ calculateTotalIncome() }}</span>
          </div>
          <div class="header-data-cost">
            <span class="header-data-cost-title">支出</span>
            <span class="header-data-cost-value">{{ calculateTotalExpense() }}</span>
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
          <div class="oneRecord" v-if="state.data.length">
            <OneRecord v-for="(record, index) in state.data" :key="index">
              <template #icon>
                <div class="icon">
                  <i :class="getIconClass(record)"></i>
                </div>
              </template>
              <template #note>
                <div>
                  {{ getNoteText(record) }}
                </div>
              </template>
              <template #value>
                <div>
                  {{ getAmountText(record) }}
                </div>
              </template>
            </OneRecord>
          </div>
          <div class="record-empty" v-else>
            您本月没有记账哦...
          </div>
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
import { reactive,ref,onMounted } from 'vue'
import ChooseTime from '@/components/ChooseTime.vue'
import OneRecord from '@/components/OneRecord.vue'
import { showToast } from 'vant';
import axios from '@/api';
import { useIconfontStore } from '@/store/iconfont'


const router = useRouter()

interface DateSelection {
  year: string;
  month: string;
}

// const list = ref([]);
const state = reactive({
  year:'2024',
  month:'1',
  showChooseTime:true,
  data:[]
})

// 获取用户登录后的信息，这里主要是拿id
const userInfoString = sessionStorage.getItem('userInfo');
const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

// 向后台获取数据
onMounted(async() => {
  const res = await axios.post('/date',{
    user_id:userInfo.id,
    year:state.year,
    month:state.month
  })
  state.data = res.data
  // console.log(state.data);
})

const iconState = useIconfontStore()


// 辅助函数  美化代码，防止html看起来太冗余
const getIconClass = (record:any) => {
  const iconStore = iconState.iconStore;
  const iconType = record.transaction_type === 'cost' ? iconStore.iconCost : iconStore.iconIncome;
  return 'iconfont ' + iconType[record.iconTypeIndex].icon;
};

const getNoteText = (record:any) => {
  return record.note === ''
    ? (record.transaction_type === 'cost' ? iconState.iconStore.iconCost[record.iconTypeIndex].name : iconState.iconStore.iconIncome[record.iconTypeIndex].name)
    : record.note;
};

const getAmountText = (record:any) => {
  return record.transaction_type === 'cost' ? `-${record.amount}` : `+${record.amount}`;
};


// const chooseTime = () => {
//   console.log();
  
// }

const loading = ref(true);
const onRefresh = async () => {
  // 获取前一个月的年月
  const prevMonth = getPrevMonth(state.year, state.month);

  setTimeout(async () => {
    showToast('刷新成功');
    loading.value = false;

    // 更新 state.year 和 state.month
    // console.log(prevMonth.year, prevMonth.month);
    
    state.year = prevMonth.year;
    state.month = prevMonth.month;

    // 请求前一个月的数据
    const res = await axios.post('/date',{
      user_id:userInfo.id,
      year:state.year,
      month:state.month
    })
    state.data = res.data
  }, 1000);
};

// 获取前一个月的年月
const getPrevMonth = (year: string, month: string) => {
  // 将传入的月份格式化为两位数字
  const formattedMonth = month.padStart(2, '0');

  let prevYear = year;
  let prevMonth = (Number(formattedMonth) - 1).toString();

  if (prevMonth === '0') {
    // 如果是1月，年份减1，月份设为12
    prevYear = (Number(year) - 1).toString();
    prevMonth = '12';
  }

  return { year: prevYear, month: prevMonth };
};


const selectedDate = ref({ year: '', month: '' });

const handleDateSelected = async (date: DateSelection) => {
  selectedDate.value = { ...date };
  state.year = selectedDate.value.year;
  state.month = selectedDate.value.month;
  
  const result = await axios.post('/date', {
    user_id: userInfo.id,
    year: state.year,
    month: state.month
  });

  // 使用 $set 来确保响应式更新
  // state.data = [];
  // result.data.forEach((record: any) => {
  //   // 如果 state.data 是数组，使用 $set
  //   // Vue.set(state.data, index, record);
  //   state.data.push(record);
  // });
  state.data =result.data
};

// 计算当月收入和支出的函数
const calculateTotalIncome = () => {
  return state.data.reduce((total: number, record: any) => {
    if (record.transaction_type === 'income') {
      total += parseFloat(record.amount);
    }
    return total;
  }, 0).toFixed(2);
};

const calculateTotalExpense = () => {
  return state.data.reduce((total: number, record: any) => {
    if (record.transaction_type === 'cost') {
      total += parseFloat(record.amount);
    }
    return total;
  }, 0).toFixed(2);
};


const goChat = () => {
  router.push('/chat')
}

const childRef = ref<any>();

const changeMonth = async() =>{
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
      height: 19.4rem;
      .vantRefresh{
        height: 100%;
        .record-empty{
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.8rem;
          color: #736868;
        }
        .icon{
          display: flex;
          align-items: center;
          justify-content: center;
          i{
            font-size: 0.9rem;
          }
          .icon-juejin{
            font-size: 0.7rem;
          }
        }
      }
    }
  }
}
</style>