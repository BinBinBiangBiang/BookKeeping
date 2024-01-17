<template>
  <div class="icon-cost">
    <div class="icon-cost-list" v-for="icon in iconCostList.iconStore.iconCost" :key="icon.icon">
      <Iconfont :iconFontProps="icon.icon" />
      <span class="icon-cost-name">{{icon.name}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Iconfont from '@/components/Iconfont.vue';
import { useIconfontStore } from '@/store/iconfont'

const iconCostList = useIconfontStore()

</script>

<style lang="less" scoped>
.icon-cost{
  height: 100vh;
  // width: 100vw;
  display: flex;
  padding-left:0.7rem;
  padding-right: 0.7rem;
  flex-wrap: wrap;
  .icon-cost-list{
    margin: 0.2rem 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
  .icon-cost-name{
    display: inline-block;
    width: 2.5rem;
    text-align: center;
    font-size: 0.6rem;
    padding: 0.3rem 0;
  }
}

</style>