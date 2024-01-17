<template>
  <div class="container">
    <div class="header">
      <div class="function">
        <div class="function-pay">支出</div>
        <div class="function-income">收入</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.container {
  .header {
    width: 100vw;
    height: 2rem;
    background: #9ce124;
    display: flex;
    justify-content: center;
    align-items: center;
    .function {
      display: flex;
      font-size: 0.9rem;
      .function-pay{
        margin-right: 0.5rem;
      }
      .function-income{
        margin-left: 0.5rem;
      }
    }
  }
}
</style>