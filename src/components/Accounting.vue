<template>
  <div>
    <!-- 选择支出图标 -->
    <div class="icon-cost">
      <div class="icon-cost-list" v-for="(icon, index) in iconCostList.iconStore.iconCost" :key="icon.icon" @click="onCost(index)">
        <Iconfont :iconFontProps="icon.icon" :class="{ 'selected': selectedIndex === index }"/>
        <span class="icon-cost-name">{{ selectedIconName(index) }}</span>
      </div>
    </div>

    <!-- 输入键盘和记录列表 -->
    <Calculate @isShow="showValue" v-if="show" :selectedIcon="selectedIcon" :selectedAmount="selectedAmount" :selectedNote="selectedNote" @saveRecord="saveRecord"/>

    <!-- 记录列表 -->
    <div v-if="records.length">
      <div v-for="(record, index) in records" :key="index">
        <div>{{ record.name }}</div>
        <div>{{ record.amount }}</div>
        <div>{{ record.note }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Iconfont from '@/components/Iconfont.vue';
import Calculate from '@/components/Calculate.vue';
import { useIconfontStore } from '@/store/iconfont'
import { ref } from 'vue';

const iconCostList = useIconfontStore();
const show = ref(false);
const selectedIndex = ref<number | null>(null);
const selectedIcon = ref<string>('');
const selectedAmount = ref<string>('');
const selectedNote = ref<string>('');
const records = ref<Array<{ icon: string, name: string, amount: string, note: string }>>([]);

const showValue = (val: boolean) => {
  show.value = val;
};

const onCost = (index: number) => {
  selectedIndex.value = index;
  selectedIcon.value = iconCostList.iconStore.iconCost[index].icon;
  show.value = true;
};

const selectedIconName = (index: number): string => {
  // 如果输入了备注，显示备注；否则显示图标名字
  return selectedNote.value || iconCostList.iconStore.iconCost[index].name;
};

const saveRecord = () => {
  if (!isValidAmount(selectedAmount.value)) {
    // 处理金额不合法的情况
    return;
  }

  const record = {
    icon: selectedIcon.value,
    name: selectedIconName(selectedIndex.value),
    amount: selectedAmount.value,
    note: selectedNote.value
  };

  records.value.push(record);

  // 清空输入
  selectedIcon.value = '';
  selectedAmount.value = '';
  selectedNote.value = '';

  console.log(record);
  
  // 隐藏输入键盘
  show.value = false;
};

const isValidAmount = (amount: string): boolean => {
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(amount);
};
</script>
