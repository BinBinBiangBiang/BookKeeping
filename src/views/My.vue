<template>
  <div class="container">
    <div class="header">
      <div class="header-avatar">头像</div>
      <div class="header-nickname">昵称</div>
      <MyPart>
        <template #icon>
          <div><i class="iconfont icon-wodezhangben"></i></div>
        </template>
        <template #text>
          <div>我的账单</div>
        </template>
      </MyPart>
    </div>

  </div>
</template>

<script lang="ts" setup>
import MyPart from '@/components/MyPart.vue'
</script>

<style lang="less">
.container{
  height: 100vh;
}


</style>
