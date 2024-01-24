<template>
  <div>
    <div class="login">
      <h1>注册</h1>
      <div class="login-wrapper">
        <div class="avatar">
          <img
            src="https://pic2.zhimg.com/v2-cf5e2c374ca2344c8f2fb1a3a0043990_r.jpg?source=1940ef5c"
            alt="">
        </div>
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field ref="usernameInputRef" v-model="state.nickname" name="昵称" label="昵称" placeholder="昵称"
              :rules="[{ required: true, message: '请填写昵称' }]" />
            <van-field ref="usernameInputRef" v-model="state.username" name="用户名" label="用户名" placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field ref="usernameInputRef" v-model="state.password" type="password" name="密码" label="密码" placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]" />
               <!-- 验证码输入框 -->
            <van-field
              ref="usernameInputRef"
              center
              clearable
              label="验证码"
              placeholder="输入验证码"
              v-model="state.verify"
            >
              <!-- 点击刷新验证码 -->
              <template #button>
                <!-- 生成验证码图片组件，ref 方便拿到组件内的实例属性 -->
                <VueImgVerify ref="verifyRef" />
              </template>
            </van-field>
          </van-cell-group>
         
          <div style="margin: 16px;">
            <van-button round block color="red" type="primary" native-type="submit">
              注册
            </van-button>
          </div>
        </van-form>
      </div>
      <p class="register" @click="login" v-show="showBtn">已有账号？点击登录</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive,ref,nextTick,onMounted,onUnmounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from '../api'
import { showSuccessToast,showFailToast } from 'vant';
import VueImgVerify from '@/components/VueImgVerify.vue';

const router = useRouter()

// 想要一次性将多个变量变成响应式的话，可以用reactive函数
// 注意：reactive函数只能接受对象，不能接受数组
// 注意：reactive函数返回的对象是响应式的

 // 便于拿到 verifyRef 组件内的实例属性
const verifyRef = ref<any>(null);

const state = reactive({ // 将对象变成响应式
  nickname: '',
  username: '',
  password: '',
  isVip: 0,
  userType: "普通用户",
  verify: "", // 验证码输入框输入的内容
  imgCode: "", // 生成的验证图片内的文字
})

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



const login = () =>{
  router.push('/login')
}

const onSubmit = async () => {
  // 使用 nextTick 确保组件渲染后再访问 verifyRef
  await nextTick();

  // 确保 verifyRef 不为 null
  if (verifyRef.value) {
    // 生成的图片验证码的文字等于验证码组件生成的验证码
    state.imgCode = verifyRef.value.imgCode || "";
    // 如果验证码组件生成的验证码的小写 != 用户输入的验证码的小写，则提示错误
    if (
      verifyRef.value.imgCode.toLowerCase() != state.verify.toLowerCase()
    ) {
      console.log("verifyRef.value.imgCode", verifyRef.value.imgCode);
      showFailToast("验证码错误");
      console.log("Generated Captcha:", verifyRef.value.imgCode.toLowerCase());
      console.log("User Input Captcha:", state.verify.toLowerCase());

      return;
    }
    // 验证码匹配成功，注册=>注册成功

    // 发请求，将state.nickname,state.username,state.password数据传给后端
    await axios.post('/register', {
      nickname: state.nickname,
      username: state.username,
      password: state.password,
      isVip: state.isVip,
      userType: state.userType
    });

    showSuccessToast('注册成功！');

    // 1s后跳转到登录页面
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  } else {
    // 处理 verifyRef 为 null 的情况
    console.error("verifyRef is null");
  }
};

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
    width: 13.44rem;
    height: 16.77rem;
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

<style>
.van-cell__title.van-field__label {
  width: 45px;
}
</style>