<template>
  <div>

<!-- 底部弹出层 -->
<van-popup v-model:show="showBottom" position="bottom" :style="{ height: '30%' }">
  <!-- 日期选择器 -->
  <van-date-picker
    v-model="currentDate"
    title="选择年月"
    :min-date="minDate"
    :max-date="maxDate"
    :columns-type="columnsType"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</van-popup>

  </div>
</template>

<script lang="ts" setup>
import { DatePickerColumnType } from 'vant';
import { ref,Ref,defineEmits  } from 'vue';

// 定义日期选择器的值的类型
type DatePickerValue = [string, string];

const currentDate: Ref<DatePickerValue> = ref(['2023', '12']);
let originalDate: DatePickerValue = [...currentDate.value]; // 初始化为一个空数组
const columnsType:DatePickerColumnType[] = ['year', 'month'];
let year = currentDate.value[0]
let month = currentDate.value[1]

const show = ref(false);
const showBottom = ref(false);
const emits = defineEmits();

const handleConfirm = () =>{
  console.log(currentDate.value[0], currentDate.value[1]);
  emits('date-selected', { year: currentDate.value[0], month: currentDate.value[1] }); // 发送自定义事件
  showBottom.value = false;
}

const handleCancel = () =>{
  // 处理取消按钮点击事件
  console.log('Cancelled');
  // 恢复日期选择器的值
  currentDate.value = [...originalDate];
  showBottom.value = false;
  console.log(currentDate.value[0], currentDate.value[1]);
}

console.log(currentDate.value[0], currentDate.value[1]);


defineExpose({
  show,
  showBottom,
  year,
  month
})

const minDate= new Date(2022, 0, 1)
const maxDate= new Date(2025, 5, 1)

</script>

<style lang="less" scoped>

</style>