// 处理记账

const Router = require('@koa/router');
const router = new Router();
const { insertRecords,selectYearAndMonth } = require('../controllers/mysqlControl.js');

// 定义记账接口 records
// 前端请求了该接口，则调用回调函数
router.post('/account',async(ctx) =>{
  // 获取到前端传递的用户id 记账类型，记账金额，记账日期，记账icon的下标，去数据库中插入这些值
  const { user_id , transaction_type ,amount,note,transaction_date,iconTypeIndex } = ctx.request.body;

  if(!user_id || !amount || !transaction_date){
    ctx.body = {
      code:'8001',
      data:'error',
      msg:'记账失败,请填写完整！'
    }
    // console.log(111);
    return
  } 
  try {
    const result = await insertRecords(user_id,transaction_type ,amount,note,transaction_date,iconTypeIndex);
    // console.log(result);
    // console.log(222);
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

// 定义查询年月份接口
router.post('/date',async(ctx) =>{
  const { user_id,year,month } = ctx.request.body;
  if(!user_id || !year || !month){
    ctx.body = {
      code:'8001',
      data:'error',
      msg:'查询失败，请确定年月份数据正确'
    }
    return
  } 
  try {
    const result = await selectYearAndMonth(user_id,year ,month);
    ctx.body = {
      code:'8000',
      data: result,
      msg:'查询成功'
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
