<template>
  <div class="footer">
      <div class="footer-item" @click="toCost">
        <i class="iconfont icon-mingxi"></i>
        <p class="footer-item-text">明细</p>
      </div>
      <div class="footer-item" @click="toDiagram">
        <i class="iconfont icon-tubiao"></i>
        <p class="footer-item-text">图表</p>
      </div>
      <div class="footer-item" >
        <i class="iconfont icon-jiahao" @click="toAccount"></i>
        <p class="footer-item-text">记账</p>
      </div>
      <div class="footer-item" @click="toFind">
        <i class="iconfont icon-faxian"></i>
        <p class="footer-item-text">发现</p>
      </div>
      <div class="footer-item" @click="toMy">
        <i class="iconfont icon-wode"></i>
        <p class="footer-item-text">我的</p>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toCost = () => {
  router.push('/cost')
}

const toDiagram = () => {
  router.push('/diagram')
}

const toAccount = () => {
  router.push('/account')
}

const toFind = () => {
  router.push('/find')
}

const toMy = () => {
  router.push('/my')
}

</script>

<style lang="less" scoped>
.footer{
    position: fixed;
    bottom: 1px;
    display: flex;
    width: 100%;
    padding: 5px 5px;
    border-top: 1px solid rgb(178, 164, 164);
    .footer-item{
      flex: 1;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      align-items: center;
      color: #736868;
      // cursor: pointer;
      i{
        font-size: 1rem;  
        display: inline-block;
        margin-bottom: 0.1rem;
      }
      .footer-item-text{
        font-size: 0.6rem;
        display: inline-block;
      }
    }
  }
</style>