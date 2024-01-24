const Router = require('@koa/router');
const router = new Router();
const { userLogin,userRegister,FindMoney,AlterMoney,AlterVip } = require('../controllers/mysqlControl.js');

// 定义登录接口 login
// 前端请求了该接口，则调用回调函数
router.post('/login',async(ctx) =>{
  // 获取到前端传递的账号和密码，去数据库中校验账号密码的正确性
  const { username , password ,isVip,userType,money } = ctx.request.body;

  try{
    const result = await userLogin(username, password)
    // console.log(result);
    if(result.length){ // 账号密码存在
      let data =  {
        id:result[0].id,
        nickname:result[0].nickname,
        username:result[0].username,
        isVip:result[0].isVip,
        userType:result[0].userType,
        money:result[0].money
      }
      ctx.body = {
        code:'8000',
        data:data,
        msg:'登录成功'
      }
    }else{
      // 出现错误：账号密码不存在
      ctx.body = {
        code:'8004',
        data:'error',
        msg:'账号或密码错误'
      }

    }
  }catch(error){
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
  }
  
  // console.log(username, password);
  // ctx.body = 'login success'
})

// 定义注册接口
router.post('/register',async(ctx) => {
  // 获取到前端传递的参数
  const { username, password, nickname,isVip,userType } = ctx.request.body;
  if(!username ||!password ||!nickname){
    ctx.body = {
      code:'8001',
      data:'error',
      msg:'注册失败,请填写完整！'
    }
    return
  } 
  try {
    const result = await userRegister(username, password, nickname,isVip,userType);

    if (result && result.affectedRows > 0) {
      // let data = {
      //   id: result.insertId,  // 自增Id
      //   nickname: nickname,
      //   username: username
      // }
      ctx.body = {
        code:'8000',
        data:'success',
        msg:'注册成功'
      }
    } else {
      ctx.body = {
        code:'8004',
        data:'error',
        msg:'注册失败,当前用户名已存在！'
      }
    }
  } catch (error) {
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
  }
})

// 定义查询用户余额接口
router.post('/findMoney',async(ctx) => {
  // 获取到前端传递的参数
  const { id } = ctx.request.body;
  if(!id){
    ctx.body = {
      code:'8001',
      data:'error',
      msg:'用户id不存在！'
    }
    return
  } 
  try {
    const result = await FindMoney(id);
    if (result && result.length > 0) {
      const money = result[0].money;
      ctx.body = {
        code:'8000',
        data:money,
        msg:'查询余额成功'
      }
    } else {
      ctx.body = {
        code:'8004',
        data: result,
        msg:'查询余额失败！'
      }
    }
  } catch (error) {
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
  }
})

// 定义修改用户余额接口
router.post('/alterMoney',async(ctx) => {
  // 获取到前端传递的参数
  const { id,money } = ctx.request.body;
  if(!id){
    ctx.body = {
      code:'8001',
      data:'error',
      msg:'用户名不存在！'
    }
    return
  } 
  try {
    const result = await AlterMoney(id,money);

    if (result && result.affectedRows > 0) {
      ctx.body = {
        code:'8000',
        data:'success',
        msg:'余额修改成功'
      }
    } else {
      ctx.body = {
        code:'8004',
        data:'error',
        msg:'余额修改失败！'
      }
    }
  } catch (error) {
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
  }
})

// 修改vip状态
router.post('/alterVip',async(ctx) => {
  // 获取到前端传递的参数
  const { id,isVip,userType } = ctx.request.body;
  if(!id){
    ctx.body = {
      code:'8001',
      data:'error',
      msg:'用户id不存在！'
    }
    return
  } 
  try {
    const result = await AlterVip(id,isVip,userType);

    if (result && result.affectedRows > 0) {
      ctx.body = {
        code:'8000',
        data:'success',
        msg:'用户信息修改成功'
      }
    } else {
      ctx.body = {
        code:'8004',
        data:'error',
        msg:'用户信息修改失败！'
      }
    }
  } catch (error) {
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
  }
})

module.exports = router;