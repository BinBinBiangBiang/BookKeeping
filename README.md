## 项目创建（准备）
1. npm init vite   
   - 使用vite脚手架进行安装

2. cd 项目文件夹名称
   - 进入项目文件夹

3. npm install
   - 安装依赖

4. npm i less --save
   - 安装less  -- save 指的是不仅仅是安装在开发环境，在项目上线的生产环境中也要使用

5. npm i vue-router
   - 安装vue-router

6. npm i pinia
   - 安装pinia(状态管理库)

7. npm i vuex
   - 安装vuex（另一种状态管理库）

8. npm i vant
   - 安装移动端UI组件库
   用法：
      import { createApp } from 'vue';
      // 1. 引入你需要的组件
      import { Button } from 'vant';
      // 2. 引入组件样式
      import 'vant/lib/index.css';

      const app = createApp();

      // 3. 注册你需要的组件
      app.use(Button);

9. npm i  @types/node -D 
   - 安装node,便于下面配置路径以及后端开发

10. 配置src路径为@
   （一）：在 vite.config.js 文件中添加别名配置：

      import path from 'path';  //这个path用到了上面安装的@types/node（npm i  @types/node -D）

      export default defineConfig({
         plugins: [vue()],
         resolve: {
            alias: {
               "@": path.resolve("./src"), // @代替src
            }
         }
      })

   （二）：ts路径映射
        在 tsconfig.json 文件中添加如下配置：

        "baseUrl": "./", //查询的基础路径 主要是这一步，下面两步是在网上找的解决路径因为ts警告问题

        "paths": {    // 新增
            "@/*": ["./src/*"],
         },

        "include": ["./src/**/*"],
        "exclude": ["node_modules"], 
   （三）：然后重启开发服务器

============================================================================================================================================
# 移动端的一些优化

//------------------------------------------------------------------------------------------------------
## rem-移动端适配方案
1. rem是相对单位，相对于页面的根字体大小而改变

在src下面创建一个config文件夹，里面存放配置文件，在里面写一个rem.js使用js来实现适配不同屏幕的rem

// 下面是简单原理介绍，主要是上面手写rem.js文件实现
// html {
//   // 1rem 多大取决于根字体多大
//   font-size: 20px;
// }

// // 用于匹配用户的屏幕的，宽度大于400px才能匹配21到23行代码
// @media(min-width: 400px) {
//   html {
//     font-size: 25px;
//   }
// }
//------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------
## 页面切换时变成平滑效果

<Transition name="move">
      <router-view></router-view>
</Transition>

样式：
.move-enter-active,.move-leave-active{
  // 设置页面跳转动画： ease-out 淡出
  transition: all 0.5s ease-out;
}

// move-enter-from 设置页面从透明度多少开始 也就是下面我们设置的opacity 到不透明（这个是默认的）
// move-leave-to 设置页面从哪个位置开始 也就是我们设置的transform: translateX(10px); 到页面的为止（这个也是默认的）
// 总的来说就是给页面设置了一个
.move-enter-from,.move-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
//------------------------------------------------------------------------------------------------------



============================================================================================================================================

## 后端开发
1. npm i axios -S(简称 全称为save)
   - 安装axios，Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。 它是 isomorphic 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js http 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。


