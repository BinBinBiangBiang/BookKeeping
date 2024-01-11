<script setup lang="ts">
// import Home from '@/views/Home.vue'
</script>

<template>
  <div>
    <Transition name="move">
      <router-view></router-view>
    </Transition>
  </div>
</template>

<style scoped>
@import url('//at.alicdn.com/t/c/font_4403701_6eaappsyhdy.css');

.move-enter-active,.move-leave-active{
   /* 设置页面跳转动画： ease-out 淡出 */
  transition: all 0.5s ease-out;
}

/* // move-enter-from 设置页面从透明度多少开始 也就是下面我们设置的opacity 到不透明（这个是默认的） */
/* // move-leave-to 设置页面从哪个位置开始 也就是我们设置的transform: translateX(10px); 到页面的为止（这个也是默认的） */
/* // 总的来说就是给页面设置了一个 */
.move-enter-from,.move-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
