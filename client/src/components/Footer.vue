<template>
  <div class="footer">
    <div class="footer-item" @click="toCost" :class="{ 'active': activeTab === 'cost' }">
      <i class="iconfont icon-mingxi"></i>
      <p class="footer-item-text">明细</p>
    </div>
    <div class="footer-item" @click="toDiagram" :class="{ 'active': activeTab === 'diagram' }">
      <i class="iconfont icon-tubiao"></i>
      <p class="footer-item-text">图表</p>
    </div>
    <div class="footer-item" @click="toAccount" :class="{ 'active': activeTab === 'account' }">
      <i class="iconfont icon-jiahao"></i>
      <p class="footer-item-text">记账</p>
    </div>
    <div class="footer-item" @click="toFind" :class="{ 'active': activeTab === 'find' }">
      <i class="iconfont icon-faxian"></i>
      <p class="footer-item-text">发现</p>
    </div>
    <div class="footer-item" @click="toMy" :class="{ 'active': activeTab === 'my' }">
      <i class="iconfont icon-wode"></i>
      <p class="footer-item-text">我的</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('');

const toCost = () => {
  router.push('/cost');
  setActiveTab('cost');
}

const toDiagram = () => {
  router.push('/diagram');
  setActiveTab('diagram');
}

const toAccount = () => {
  router.push('/account');
  setActiveTab('account');
}

const toFind = () => {
  router.push('/find');
  setActiveTab('find');
}

const toMy = () => {
  router.push('/my');
  setActiveTab('my');
}

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
}
</script>

<style lang="less" scoped>
.footer{
    position: fixed;
    bottom: 0rem;
    display: flex;
    width: 100%;
    padding: 0.2rem 0.1rem;
    border-top: 0.04rem solid rgb(178, 164, 164);
    z-index: 20;

    .footer-item{
      flex: 1;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      align-items: center;
      color: #736868;
      &.active {
        color: rgb(209, 209, 37); 
      }
      // cursor: pointer;
      i{
        font-size: 1rem;  
        // display: inline-block;
        margin-bottom: 0.1rem;
      }
      .footer-item-text{
        font-size: 0.6rem;
        // display: inline-block;
      }
    }
  }

  // 动态添加的样式
  
</style>