import { defineStore } from "pinia"; 
import { reactive } from "vue";


export const useIconfontStore = defineStore('iconfont',()=>{
  const iconStore = reactive({
    iconCost:[
      {
        icon:'icon-canyin',
        name:'餐饮',
        type:'cost'
      },
      {
        icon:'icon-gouwuchekong',
        name:'购物',
        type:'cost'
      },
      {
        icon:'icon-riyongbaihuo',
        name:'日用',
        type:'cost'
      },
      {
        icon:'icon-jiaotong',
        name:'交通',
        type:'cost'
      },
      {
        icon:'icon-shucai',
        name:'蔬菜',
        type:'cost'
      },
      {
        icon:'icon-shuiguo',
        name:'水果',
        type:'cost'
      },
      {
        icon:'icon-lingshi',
        name:'零食',
        type:'cost'
      },
      {
        icon:'icon-yundong',
        name:'运动',
        type:'cost'
      },
      {
        icon:'icon-yule',
        name:'娱乐',
        type:'cost'
      },
      {
        icon:'icon-tongxun',
        name:'通讯',
        type:'cost'
      },
      {
        icon:'icon-red-chongwufushi',
        name:'服饰',
        type:'cost'
      },
      {
        icon:'icon-meirong-heicopy',
        name:'美容',
        type:'cost'
      },
      {
        icon:'icon-zhufang',
        name:'住房',
        type:'cost'
      },
      {
        icon:'icon-lvhang',
        name:'旅行',
        type:'cost'
      },
      {
        icon:'icon-shouye',
        name:'孩子',
        type:'cost'
      },
      {
        icon:'icon-13',
        name:'社交',
        type:'cost'
      },
      {
        icon:'icon-chongwu',
        name:'宠物',
        type:'cost'
      },
      {
        icon:'icon-bangongbao_o',
        name:'办公',
        type:'cost'
      },
      {
        icon:'icon-shumashouji',
        name:'数码',
        type:'cost'
      },
      {
        icon:'icon-qiche',
        name:'汽车',
        type:'cost'
      },
      {
        icon:'icon-weixiu',
        name:'维修',
        type:'cost'
      },
      {
        icon:'icon-aixinjuanzeng',
        name:'捐赠',
        type:'cost'
      },
      {
        icon:'icon-qinyou',
        name:'亲友',
        type:'cost'
      },
      {
        icon:'icon-kuaidi',
        name:'快递',
        type:'cost'
      }
    ],
    iconIncome:[
      {
        icon:'icon-gongzi',
        name:'工资',
        type:'income'
      },
      {
        icon:'icon-jianzhi',
        name:'兼职',
        type:'income'
      },
      {
        icon:'icon-licai',
        name:'理财',
        type:'income'
      },
      {
        icon:'icon-tuijianlijin',
        name:'礼金',
        type:'income'
      },
      {
        icon:'icon-juejin',
        name:'掘金',
        type:'income'
      },
      {
        icon:'icon-a-waibao6',
        name:'外包',
        type:'income'
      },
      {
        icon:'icon-gaofei',
        name:'稿费',
        type:'income'
      },
      {
        icon:'icon-qita',
        name:'其他',
        type:'income'
      },
    ]
  })

  return {
    iconStore
  }
})