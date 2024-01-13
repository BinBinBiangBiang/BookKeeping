<template>
  <div>
    <van-cell title="监听点击事件" is-link @click="show = true" />
    <van-popup
      v-model:show="show"
      position="bottom"
      :style="{ height: '30%' }"
      closeable
      @click-overlay="onClickOverlay"
      @click-close-icon="onClickCloseIcon"
    />
  </div>
</template>

<script lang="ts" >
import { ref } from 'vue';
import { showToast } from 'vant';

const show = ref(true);
const onClickOverlay = () => {
  showToast('click-overlay');
};
const onClickCloseIcon = () => {
  showToast('click-close-icon');
};


</script>

<style lang="less" scoped>

</style>