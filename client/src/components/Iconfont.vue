<template>
  <div class="box">
    <div class="iconfont">
      <i :class="'iconfont ' + props.iconFontProps"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {  defineProps } from 'vue';

const props = defineProps({
  iconFontProps:{
    type: String,
    default: 'icon-canyin'
  }
});
</script>

<style lang="less" scoped>
.box {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  background: #e2dede;
}

.iconfont {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  height: 100%;
}

.iconfont i {
  color: #c93131; // 设置图标颜色为白色，你可以根据需要调整
}
</style>
