// 处理记账

const Router = require('@koa/router');
const router = new Router();
const { insertRecords } = require('../controllers/mysqlControl.js');

// 定义记账接口 records
// 前端请求了该接口，则调用回调函数
router.post('/account',async(ctx) =>{
  // 获取到前端传递的账号和密码，去数据库中校验账号密码的正确性
  const { user_id , transaction_type ,amount,note,transaction_date } = ctx.request.body;

  if(!user_id ||!transaction_type ||!amount ||!transaction_date){
    ctx.body = {
      code:'8001',
      data:'error',
      msg:'记账失败,请填写完整！'
    }
    console.log(111);
    return
  } 
  try {
    const result = await insertRecords(user_id,transaction_type ,amount,note,transaction_date );
    console.log(result);
    console.log(222);
    ctx.body = {
      code:'8000',
      data:'success',
      msg:'记账成功'
    }
  } catch (error) {
    console.log(333);
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
  }
})

module.exports = router;
