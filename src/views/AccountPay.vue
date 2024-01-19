<template>
  <div>
      <div class="icon-cost">
        <div class="icon-cost-list" v-for="(icon, index) in iconCostList.iconStore.iconCost" :key="icon.icon"
          @click="onCost(index)">
          <Iconfont :iconFontProps="icon.icon" :class="{ 'selected': selectedIndex === index }"/>
          <span class="icon-cost-name">{{ icon.name }}</span>
        </div>
      </div>
      <Calculate @isShow="showValue" v-if="show"/>
  </div>
  
</template>

<script lang="ts" setup>
import Iconfont from '@/components/Iconfont.vue';
import Calculate from '@/components/Calculate.vue';
import { useIconfontStore } from '@/store/iconfont'
import { ref } from 'vue'

const show = ref(false)  

const showValue = (val: boolean) =>{
  show.value = val;
}

const iconCostList = useIconfontStore()
// 将 selectedIndex 的类型设为 ref<number | null>，表示它可以是数字或空。这样在点击事件中，它的值可以被设置为 number 类型。
const selectedIndex = ref<number | null>(null);

const onCost = (index:number) => {
  selectedIndex.value = index;
  console.log(iconCostList.iconStore.iconCost[index].name);
  show.value = true;
}

</script>

<style lang="less" scoped>
.icon-cost {
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  // 改善滚动的流畅性。
  -webkit-overflow-scrolling: touch;
  // width: 100vw;
  display: flex;
  align-content: flex-start;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  flex-wrap: wrap;

  .icon-cost-list {
    margin: 0.2rem 0.5rem;
    width: 2.5rem;
    height: 3.8rem;

    .selected {
      background-color: yellow;
    }

    .icon-cost-name {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 0.6rem;
      padding: 0.3rem 0;
    }
  }
}

// 动态添加的类名</style>