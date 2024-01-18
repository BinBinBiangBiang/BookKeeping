<template>
  <div class="icon-income">
    <div class="icon-income-list " v-for="(icon, index) in iconIncomeList.iconStore.iconIncome" :key="icon.icon"
       @click="onIncome(index)">
      <Iconfont :iconFontProps="icon.icon" :class="{ 'selected': selectedIndex === index }"/>
      <span class="icon-income-name">{{ icon.name }}</span>
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

const iconIncomeList = useIconfontStore()
// 将 selectedIndex 的类型设为 ref<number | null>，表示它可以是数字或空。这样在点击事件中，它的值可以被设置为 number 类型。
const selectedIndex = ref<number | null>(null);

const showValue = (val: boolean) =>{
  show.value = val;
}

const onIncome = (index:number) => {
  selectedIndex.value = index;
  console.log(iconIncomeList.iconStore.iconIncome[index].name);
  show.value = true;
}

// const isShow = (val) =>{
//   show.value = val;
// }

</script>

<style lang="less" scoped>
.icon-income {
  height: 100vh;
  max-height: 100vh;
  align-content: flex-start;
  overflow-y: auto;
  // 改善滚动的流畅性。
  -webkit-overflow-scrolling: touch;
  // width: 100vw;
  display: flex;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  flex-wrap: wrap;
  overflow: auto;
  .icon-income-list {
    margin: 0.2rem 0.5rem;
    width: 2.5rem;
    height: 3.9rem;

    // 动态添加的类名
    .selected {
      background-color: yellow;
    }

    .icon-income-name {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 0.6rem;
      padding: 0.3rem 0;
    }
  }
}

</style>