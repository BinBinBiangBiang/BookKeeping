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
          <div class="tabs-item">
            <i class="iconfont icon-zhangdan"></i>
            <p>账单</p>
          </div>
          <div class="tabs-item">
            <i class="iconfont icon-yusuan"></i>
            <p>预算</p>
          </div>
          <div class="tabs-item">
            <i class="iconfont icon-zichanguanjia"></i>
            <p>资产管家</p>
          </div>
          <div class="tabs-item">
            <i class="iconfont icon-fanxian"></i>
            <p>购物返现</p>
          </div>
        </div>
      </div>
      <div class="content">
        <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item.id" :title="item.title" />
        </van-list>
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

const router = useRouter()

interface DateSelection {
  year: string;
  month: string;
}

// const list = ref([]);
const state = reactive({
  loading: false,
  finished: false,
  year:2023,
  month:12,
  showChooseTime:true
})

const list = [
  {
    id: 1,
    title: '吃饭',
    price: '100',
    type: '支出',
  },
  {
    id: 2,
    title: '吃饭',
    price: '50',
    type: '支出',
  }
]

// const chooseTime = () => {
//   console.log();
  
// }

const selectedDate = ref({ year: '', month: '' });

const handleDateSelected = (date:DateSelection):void => {
  selectedDate.value = { ...date };
  state.year = Number(selectedDate.value.year);
  state.month = Number(selectedDate.value.month);
  // 更新其他需要的显示
};

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  // setTimeout(() => {
  for (let i = 0; i < 10; i++) {
    list.push({
      id: 3,
      title: '吃饭',
      price: '100',
      type: '支出',
    });
  }

  // 加载状态结束
  state.loading = false;

  // 数据全部加载完成
  if (list.length >= 2) {
    state.finished = true;
  }
  // }, 1000);
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
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  .main {
    height: 100%;
    overflow: auto;

    .header {
      height: 7rem;
      position: fixed;
      top: 0;
      background: rgb(154, 243, 65);

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
      overflow: hidden;
      padding-top: 7rem;
    }
  }
}
</style>