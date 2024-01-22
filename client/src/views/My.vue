<template>
  <div class="container">
    <div class="header">
      <div class="header-info">
        <div class="header-avatar">
          <van-image
          round
          width="3.2rem"
          height="3.2rem"
          src="https://gd-hbimg.huaban.com/4403e200788d9bdbd929452c4a810e6038e0dbf0ba85-4r7oTD_fw658"
          />
        </div>
        <div class="header-nickname">{{userInfo.nickname}}</div>
        <div class="header-vip">
          <div class="novip-icon"><i class="iconfont icon-vip-copy" :class="{'Vip':userInfo.isVip}"></i></div>
        </div>
      </div>
    </div>
    <div class="parts">
      <div class="part1">
        <MyPart @click="onVip">
        <template #icon>
          <div><i class="iconfont icon-vip"></i></div>
        </template>
        <template #text>
          <div class="text-isVip" v-if="userInfo.isVip">
            <div>你已经是尊敬的VIP啦</div>
            <div class="text-vip">快去体验VIP权限吧</div>
          </div>
          <div class="text-isNoVip" v-else>
            <div>升级为VIP</div>
            <div class="text-noVip">享受更多高级功能</div>
          </div>
        </template>
        </MyPart>
      </div>
      <div class="part3">
        <MyPart>
        <template #icon>
          <div><i class="iconfont icon-wodezhangben"></i></div>
        </template>
        <template #text>
          <div>我的账本</div>
        </template>
        </MyPart>
        <MyPart>
          <template #icon>
            <div><i class="iconfont icon-property"></i></div>
          </template>
          <template #text>
            <div>家庭账单</div>
          </template>
        </MyPart>
      </div>
      <div class="part4">
        <MyPart>
        <template #icon>
          <div><i class="iconfont icon-shezhi1"></i></div>
        </template>
        <template #text>
          <div>设置</div>
        </template>
        </MyPart>
        <MyPart>
          <template #icon>
            <div><i class="iconfont icon-zhanghuanquanzhongxin"></i></div>
          </template>
          <template #text>
            <div>账户安全中心</div>
          </template>
        </MyPart>
        <MyPart>
          <template #icon>
            <div><i class="iconfont icon-shiyongbangzhu"></i></div>
          </template>
          <template #text>
            <div>使用帮助</div>
          </template>
        </MyPart>
        <MyPart>
          <template #icon>
            <div><i class="iconfont icon-yijianfankui"></i></div>
          </template>
          <template #text>
            <div>意见反馈</div>
          </template>
        </MyPart>
        <MyPart>
          <template #icon>
            <div><i class="iconfont icon-icon"></i></div>
          </template>
          <template #text>
            <div>给作者一个赞把^-^</div>
          </template>
        </MyPart>
        <MyPart>
          <template #icon>
            <div><i class="iconfont icon-cuowutishi-copy"></i></div>
          </template>
          <template #text>
            <div>关于冰冰记账</div>
          </template>
        </MyPart>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyPart from '@/components/MyPart.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

// 这里假设我们只有一个用户，用户数组下标为0，先写死，后期加了登录功能后再改
const i = 0;

const userInfoString = sessionStorage.getItem('userInfo');
const userInfo = JSON.parse(userInfoString);


// 页面跳转
const onVip = () => {
  if(userInfo.isVip){
    router.push('/vip');
  }else{
    router.push('/noVip')
    // console.log(userInfo);
  }
}
</script>

<style lang="less" scoped>
.container{
  height: 100vh;
  .header{
    display: flex;
    height: 5rem;
    padding: 0.08rem 0.9rem;
    background:rgb(218, 218, 93);
    .header-info{
      display: flex;
      align-items: center;
      .header-nickname{
        margin-left: 0.8rem;
      }
      .header-vip{
        margin-left: 0.18rem;
        .Vip{
          color:yellow;
        }
      }
    }
    
  }
  .parts{
    margin-top: 0.4rem;
    .part1{
      margin-bottom: 0.5rem;
      .text-vip{
        margin-top: 0.2rem;
        padding-left: 0.08rem;
        font-size: 0.45rem;
        color: rgb(135, 135, 135);
      }
    }
    .part3{
      margin-bottom: 1rem;
    }
  }
}



// 字体图标样式

.icon-zhanghuanquanzhongxin,.icon-property,.icon-shezhi1,.icon-cuowutishi-copy{
  color: rgb(82, 95, 102);
}
</style>
