
const db = require('./db');


// 用户注册
async function register(account, password) {

 // 检查用户是否已经存在
  let user = await db('user').where({account}).first();
  if (user) {
    throw '该用户名已经被注册'
  }

  let CreationTime = new Date();
  let res = await db('user')
    .insert({ account, password,CreationTime },['id'])
   return res
}


module.exports = {
  register
}

