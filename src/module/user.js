const db = require('../db/index');


// 获取用户信息
const getUserInfo = async (token) => {
  let userInfo = await db('user')
    .where({ token })
    .select('id', 'account','Logtime','CreationTime')
    .first()
    return userInfo
}


module.exports = {
  getUserInfo
}