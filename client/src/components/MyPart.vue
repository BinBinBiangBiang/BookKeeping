<template>
  <div class="my-part">
    <div class="icon"><slot name="icon" class="iconfont"></slot></div>
    <div class="content">
      <div class="text"><slot name="text"></slot></div>
      <div class="arrow"><i class="iconfont icon-youjiantou"></i></div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less">
.my-part{
  display: flex;
  align-items: center;
  // width: 100vw;
  // padding: 0 0.4rem;
  margin: 0 0.8rem;
  background: #fff;
  height: 1.5rem;
  border: 1px solid #d0cdcd;
  border-radius: 8px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  height: 2rem;
  .icon{
    padding-left: 0.4rem;
    font-size: 1.2rem;
  }
  .content{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 0.4rem;
    
    .text{
      font-size: 0.65rem;
      color: #333;
      margin-left: 0.4rem;
    }
  }
  .arrow{
    position: absolute;
    right: 1rem;
    .icon-youjiantou{
      font-size: 1.0rem;
      color: #918989;
    }
  }
}

.iconfont{
  font-size: 1.1rem;
}
</style>