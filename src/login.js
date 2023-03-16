const db = require('./db/index');

async function login  (account,password){
let user = await db('user')
  .where({ account, password })
  .select('id', 'account','token','CreationTime','Logtime')
  .first()

 return updateLastLogin(user)

}

// 更新用户信息
async function updateLastLogin(user){

  if(user){
    let token = generateToken()
    let  lastLogin = new Date();
    let updateUser = await db('user')
    .where({id:user.id})
    .update('Logtime', lastLogin)
    .update('token', token)
    if(updateUser === 1) {
      return {...user,token}
    }else {
      return null
    }
  }else {
    return null
  }
  }
  // 生成token
  function generateToken(){
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }




module.exports = login;

