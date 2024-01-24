// 和数据库连接的相关操作

const mysql = require('mysql2');
const config = require('../config') 

// 创建线程池
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT,
});

// 连接mysql
const allService = {
  query : function(sql,values){
    // pool 连接
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection) => {
        if(err){
          reject(err);
        }else{
          // 执行sql语句
          connection.query(sql,values,function(err,rows){
            if(err){
              // 释放错误
              reject(err);
            }else{
              resolve(rows);
            }
            connection.release(); // 释放连接
          })
        }
      })
    })
  }
}

// 检测数据库连接是否正常
const testConnection = async () => {
  try {
    const result = await allService.query('SELECT 1 as test');
    console.log('Database connection test result:', result);
  } catch (error) {
    console.error('Database connection test failed:', error);
  }
};

testConnection();

// 登录
const userLogin = (username,password) =>{
  let _sql = `select * from user where username = "${username}" and password = "${password}";`
  return allService.query(_sql)
}

// 注册
const userRegister = async (username, password, nickname,isVip,userType) => {
  let sql1 = `select * from user where username = "${username}";`
  try {
    let result = await allService.query(sql1);
    if (result && result.length > 0) {
      return false;
    } else {
      let sql2 = `insert into user (username, password, nickname,isVip,userType) values ("${username}","${password}","${nickname}","${isVip}","${userType}");`
      // console.log('SQL Statement:', sql2);
      const insertResult = await allService.query(sql2);
      // console.log('Insert Result:', insertResult);
      // 直接返回插入操作的结果
      return insertResult;
    }
  } catch (error) {
    throw error; // 抛出异常以便在调用方进行处理
  }
}

// 记账
const insertRecords = async(user_id,transaction_type,amount,note,transaction_date,iconTypeIndex) => {
  try{
    let sql = `insert into transaction (user_id,transaction_type,amount,note,transaction_date,iconTypeIndex) values ("${user_id}","${transaction_type}","${amount}","${note}","${transaction_date}","${iconTypeIndex}");`
    const insertResult = await allService.query(sql)
    return insertResult
  } catch(error){
    throw error;
  }
}

// 提取年份月份信息
const selectYearAndMonth = async (user_id, year, month) => {
  try {
    // 使用占位符构建 SQL 语句，确保防止 SQL 注入攻击
    let sql = `
      SELECT id, user_id, DATE_FORMAT(transaction_date, '%Y-%m-%d') AS transaction_date, amount,iconTypeIndex, transaction_type,note
      FROM transaction
      WHERE user_id = ? AND transaction_date LIKE ?;
    `;

    // 构建参数数组，其中包括用户ID、以及类似 '2024-01%' 的日期字符串
    // .padStart(2, '0')：这确保月份始终为两位数，如果需要，通过在前面添加 '0' 进行填充
    // %：这是 SQL 中 LIKE 子句中使用的通配符字符。它允许对 transaction_date 列进行部分匹配。在这种情况下，它匹配以格式化后的 "YYYY-MM" 开头的任何字符串。
    const params = [user_id, `${year}-${month.padStart(2, '0')}%`];

    // 执行 SQL 查询
    const result = await allService.query(sql, params);

    // 返回查询结果
    return result;
  } catch (error) {
    console.error('Error in selectYearAndMonth:', error);
    throw error; 
  }
};

// 查询用户余额
const FindMoney = async (id) => {
  let sql = `select money from user where id = "${id}";`
  try {
    let result = await allService.query(sql);
    return result
  } catch (error) {
    throw error; // 抛出异常以便在调用方进行处理
  }
}

// 修改用户余额
const AlterMoney = async(id,money) => {
  try{
    let sql = `UPDATE user SET money = ${money} WHERE id = ${id};`;
    const updateResult = await allService.query(sql)
    return updateResult
  } catch(error){
    throw error;
  }
}

// 修改用户Vip状态
const AlterVip = async(id,isVip,userType) => {
  try{
    let sql = `UPDATE user SET isVip = ${isVip} ,userType = "${userType}"  WHERE id = ${id};`;
    const updateResult = await allService.query(sql)
    return updateResult
  } catch(error){
    throw error;
  }
}

module.exports = {
  userLogin,
  userRegister,
  insertRecords,
  selectYearAndMonth,
  FindMoney,
  AlterMoney,
  AlterVip
}

