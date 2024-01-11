<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header-title">
          <i class="iconfont icon-13" @click="goChat"></i>
          <p class="header-title-text">冰冰记账</p>
        </div>
        <div class="header-data">
          <div class="header-data-time">2024年</div>
          <div class="header-data-make">
            收入
          </div>
          <div class="header-data-cost">花费</div>
        </div>
        <div class="tabs">
          <div class="tabs-item">
            <i class="iconfont icon-zhangdan"></i>
          </div>
          <div class="tabs-item">
            <i class="iconfont icon-yusuan"></i>
          </div>
          <div class="tabs-item">
            <i class="iconfont icon-zichanguanjia"></i>
          </div>
          <div class="tabs-item">
            <i class="iconfont icon-fanxian"></i>
          </div>
        </div>
      </div>
      <div class="content">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item.id" :title="item.title" />
        </van-list>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter()

// const list = ref([]);
const loading = ref(false);
const finished = ref(false);

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
  loading.value = false;

  // 数据全部加载完成
  if (list.length >= 2) {
    finished.value = true;
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
      height: 5rem;
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
        width: 100%;

        .tabs-item {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          color: #736868;
        }
      }
    }

    .content {
      margin-top: 5rem;
    }
  }
}
</style>