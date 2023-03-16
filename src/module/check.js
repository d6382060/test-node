const db = require('../db/index');
 
 // 判断是否登录

  const isLogin =async (token)=>{
    let loginStatus  = await db('user')
    .where({token})
    .first()
    if(loginStatus){
      return true
    }else {
      return false
    }
  }

  module.exports = {
    isLogin
  }