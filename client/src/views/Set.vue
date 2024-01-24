<template>
  <div class="settings">
    <div class="header">
      <div class="back" @click="goBack">返回</div>
    </div>
    <h1 class="title">设置</h1>

    <div class="setting-item" @click="logout">
      <i class="iconfont icon-logout"></i>
      <p>退出登录</p>
    </div>

    <div class="setting-item" @click="changeLanguage">
      <i class="iconfont icon-language"></i>
      <p>语言设置</p>
    </div>

    <div class="setting-item" @click="changeTheme">
      <i class="iconfont icon-theme"></i>
      <p>主题设置</p>
    </div>

    <!-- 其他设置项 -->

  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push('/my')
}

const logout = () => {
  sessionStorage.removeItem('userInfo');

  // 跳转到登录页面
  router.push('/login');
};

const changeLanguage = () => {
  showToast('该模块暂未开发');
};

const changeTheme = () => {
  showToast('该模块暂未开发');
};
</script>

<style lang="less" scoped>
.settings {
  padding: 20px;
  text-align: center;

  .header {
    width: 100vw;
    height: 2rem;
  }

  .back {
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

  .setting-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    i {
      font-size: 1.2rem;
      margin-right: 10px;
      color: #4285f4;
    }

    p {
      font-size: 1rem;
      color: #333;
    }
  }

  /* 样式可以根据需要自行扩展 */
}</style>
