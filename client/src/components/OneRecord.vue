<template>
  <div class="container">
    <div class="icon"><slot name="icon" class="iconfont i1"></slot></div>
    <div class="note"><slot name="note"></slot></div>
    <div class="value"><slot name="value"></slot></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.container{
  display: flex;
  padding: 0.2rem 0.1rem;
  border-bottom: 0.04rem solid rgb(242, 238, 238) ;
  align-items: center;
  height: 2rem;
  .icon{
    background: #d9d7d7;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.2rem;
    margin-right: 0.5rem;
    .i1{
      font-size: 0.9rem;
    }
  }
  .note{
    font-size: 0.75rem;
    flex:1;
  }
  .value{
    font-size: 0.6rem;
  }
}
</style>