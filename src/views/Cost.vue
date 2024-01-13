<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header-title">
          <i class="iconfont icon-13" @click="goChat"></i>
          <p class="header-title-text">冰冰记账</p>
        </div>
        <div class="header-data">
          <div class="header-data-time">
            
          </div>
          <div class="header-data-make">
            收入
          </div>
          <div class="header-data-cost">花费</div>
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
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue'

const router = useRouter()

// const list = ref([]);
const state = reactive({
  loading: false,
  finished: false,
  show: false,
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

const showBottom = () => {
  state.show = true;
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
</script>

<style lang="less" scoped>
.container {
  height: 100vh;

  .main {
    height: 100%;
    overflow: auto;

    .header {
      height: 6rem;
      position: fixed;
      top: 0;
      background: rgb(154, 243, 65);

      .header-data {
        display: flex;
        justify-content: space-around;
        padding-bottom: 0.3rem;
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
      padding-top: 6rem;
    }
  }
}
</style>