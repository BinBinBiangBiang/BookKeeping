//RouteRecordRaw 是一个 TypeScript 接口，用于描述路由的配置。它包含了路由配置的各种属性，
// 如 path、name、component、children 等。通过使用 RouteRecordRaw，你可以在开发过程中更早地发现潜在的错误，并获得更好的编辑器支持。
import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router"
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';


const routes:RouteRecordRaw[] =[
  {
    path:'/',
    redirect:{name:'login'}
  },
  {
    path:'/login',
    name:'login',
    component: () => import('@/views/Login.vue'),
    meta:{
      title:'登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
    meta:{
      title:'注册'
    }
  },
  {
    path:'/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta:{
      title:'首页'
    },
    children: [
      {
        path:'/cost',
        name:'cost',
        component: () => import('@/views/Cost.vue'),
        meta:{
          title:'明细'
        }
      },
      {
        path:'/diagram',
        name:'diagram',
        component: () => import('@/views/Diagram.vue'),
        meta:{
          title:'图表'
        }
      },
      {
        path:'/find',
        name:'find',
        component: () => import('@/views/Find.vue'),
        meta:{
          title:'发现'
        }
      },
      {
        path:'/my',
        name:'my',
        component: () => import('@/views/My.vue'),
        meta:{
          title:'我的'
        }
      }
    ]
  },
  {
    path:'/chat',
    name:'chat',
    component: () => import('@/views/Chat.vue'),
    meta:{
      title:'智能助手'
    }
  },
  {
    path:'/cost/bill',
    name:'bill',
    component: () => import('@/views/Bill.vue'),
    meta:{
      title:'账单'
    }
  },
  {
    path:'/cost/budget',
    name:'budget',
    component: () => import('@/views/Budget.vue'),
    meta:{
      title:'预算'
    }
  },
  {
    path:'/cost/assetManager',
    name:'assetsManager',
    component: () => import('@/views/AssetManager.vue'),
    meta:{
      title:'资产管家'
    }
  },
  {
    path:'/cost/shoppingCashback',
    name:'shoppingCashback',
    component: () => import('@/views/ShoppingCashback.vue'),
    meta:{
      title:'购物返现'
    }
  },
  {
    path:'/account',
    name:'account',
    component: () => import('@/views/Account.vue'),
    meta:{  
      title:'智能助手'
    }
  },
  {
    path:'/vip',
    name:'vip',
    component: () => import('@/views/Vip.vue'),
    meta:{  
      title:'Vip'
    }
  },
  {
    path:'/noVip',
    name:'noVip',
    component: () => import('@/views/noVip.vue'),
    meta:{  
      title:'Vip充值'
    }
  },
  {
    path:'/aboutSoftware',
    name:'aboutSoftware',
    component: () => import('@/views/AboutSoftWare.vue'),
    meta:{  
      title:'关于我们'
    }
  },
  {
    path:'/set',
    name:'set',
    component: () => import('@/views/Set.vue'),
    meta:{  
      title:'设置'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 开启路由守卫
const whitePath = ['/login', '/register'];

router.beforeEach((to, from: RouteLocationNormalized | undefined, next: NavigationGuardNext) => {
  console.log(from);
  document.title = to.meta.title;

  if (!whitePath.includes(to.path)) {
    if (!sessionStorage.getItem('userInfo')) {
      router.push('/login');
      return;
    } else {
      next();
      return;
    }
  }

  next(); // 放行
});



export default router