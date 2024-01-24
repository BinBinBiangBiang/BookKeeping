<template>
  <div class="about">
    <div  class="header"><div class="back" @click="goBack">返回</div></div>
    <h1 class="title">关于冰冰记账</h1>
    <div class="content">
      <p>
        欢迎使用冰冰记账，一个简单而强大的记账工具，助您轻松管理财务。
      </p>
      <p>
        冰冰记账提供直观的用户界面，让您随时记录收入和支出，清晰了解自己的财务状况。
      </p>
      <p>
        主要特点：
      </p>
      <ul>
        <li>方便快捷的记账功能</li>
        <li>智能图表展示财务数据</li>
        <li>灵活的预算管理</li>
        <li>购物返现功能，让您更省钱</li>
      </ul>
      <p>本人目前大三，正在学习进化中...</p>、
      <p>
        如果您有任何建议或问题，<br />
        请联系我们：biangbiangonlyone@gmail.com。
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const goBack = () =>{
  router.push('/my')
}
</script>

<style lang="less" scoped>
.about {
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 隐藏溢出部分 */
  text-align: center;
  .header{
  width: 100vw;
  height: 2rem;
  }
  .back{
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    color: #4285f4;
  }
  .title {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #333;
  }

  .content {
    font-size: 1rem;
    color: #666;
    overflow: hidden; /* 隐藏溢出部分 */

    p {
      margin-bottom: 15px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 8px;
        &:before {
          content: '•';
          color: #4285f4;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
      }
    }
  }
}
</style>
