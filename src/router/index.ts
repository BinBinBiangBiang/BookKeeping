//RouteRecordRaw 是一个 TypeScript 接口，用于描述路由的配置。它包含了路由配置的各种属性，
// 如 path、name、component、children 等。通过使用 RouteRecordRaw，你可以在开发过程中更早地发现潜在的错误，并获得更好的编辑器支持。
import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router"


const routes:RouteRecordRaw[] =[
  {
    path:'/',
    redirect:{name:'home'}
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
    path:'/account',
    name:'account',
    component: () => import('@/views/Account.vue'),
    meta:{  
      title:'智能助手'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router