<template>
  <div>
    <van-date-picker
  v-model="currentDate"
  title="选择年月"
  :min-date="minDate"
  :max-date="maxDate"
  :columns-type="columnsType"
/>


  </div>
</template>

<script lang="ts" setup>
import { DatePickerColumnType } from 'vant';
import { ref } from 'vue';

const currentDate = ref(['2021', '01']);
const columnsType:DatePickerColumnType[] = ['year', 'month'];



const minDate= new Date(2020, 0, 1)
const maxDate= new Date(2025, 5, 1)
</script>

<style lang="less" scoped>

</style>