<template>
  <div>
    <div class="login">
      <h1>登录</h1>
      <div class="login-wrapper">
        <div class="avatar">
          <img
            src="https://pic2.zhimg.com/v2-cf5e2c374ca2344c8f2fb1a3a0043990_r.jpg?source=1940ef5c"
            alt="">
        </div>
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field ref="usernameInputRef" v-model="state.username" name="用户名" label="用户名" placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field ref="usernameInputRef" v-model="state.password" type="password" name="密码" label="密码" placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]" />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
      <p class="register" @click="register" v-show="showBtn">新用户？点击这里注册</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive,ref,onMounted,onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/index'
import {showSuccessToast } from 'vant';
 
const router = useRouter()

// 解决部分安卓端输入法键盘会将固定在底部的元素顶上去的问题
const showBtn = ref(true);
const clientHeight = ref(document.documentElement.clientHeight);

const handleResize = () => {
  if (clientHeight.value > document.documentElement.clientHeight) {
    showBtn.value = false;
  } else {
    showBtn.value = true;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});





// 想要一次性将多个变量变成响应式的话，可以用reactive函数
// 注意：reactive函数只能接受对象，不能接受数组
// 注意：reactive函数返回的对象是响应式的

const state = reactive({ // 将对象变成响应式
  username: '',
  password: '',
  isVip: false,
  userType:'普通用户',
  money:0
})

const onSubmit = async() => {
  // 发请求，将state.username,state.password数据传给后端

  // console.log(state.username,state.password)
  const res = await axios.post('/login',{
    username: state.username,
    password: state.password,
    isVip: state.isVip,
    userType: state.userType,
    money: state.money
  })

  // console.log(res);
  // 保存用户信息
  sessionStorage.setItem('userInfo',JSON.stringify(res.data))
  showSuccessToast('登录成功')

  // 1s后跳转页面
  setTimeout(() =>{
    router.push('/cost')
  },1500)
}

const register = () => {
  // 跳转到注册页面
  router.push('/register')
}


</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 0 1.3rem;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  margin-top: 0.9rem;
  h1 {
    height: 0.6933rem;
    text-align: center;
    margin-top: 1.12rem;
    font-size: 0.88rem;
  }

  .login-wrapper {
    width: 11.44rem;
    height: 14.77rem;
    border: 1px solid rgba(187, 187, 187, 1);
    margin: 0 auto;
    margin-top: 2.7rem;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.533rem 0 rgba(170, 170, 170, 1);

    .avatar {
      width: 3.4rem;
      height: 3.4rem;
      overflow: hidden;
      border-radius: 50%;
      margin: 1rem auto 0.77rem;

      img {
        width: 100%;
      }
    }
  }

  .register {
    position: absolute;
    bottom: 4.2rem;
    width: 80%;
    left: 50%;
    text-align: center;
    font-size: 0.474rem;
    transform: translateX(-50%);
    height: 0.6rem;
    line-height: 0.6rem;
    color: rgba(16, 16, 16, 1);
  }
}
</style>

