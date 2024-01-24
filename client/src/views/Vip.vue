<template>
  <div class="container">
    <div class="back" @click="goBack">返回</div>
    <div class="content">
      您已经是vip了，去体验VIP功能叭
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack =() => {
  router.push('/cost')
}
</script>

<style lang="less" scoped>
.container{
  height: 100vh;
  display: flex;
  flex-direction: column;
  .back{
    margin-left: 0.2rem;
    margin-top: 0.2rem;
  }
  .content{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>