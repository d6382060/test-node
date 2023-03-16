const db = require('./db');

// 创建聊天
const createChat =async function (userId,title,message) {
 let res = await db('message_info')
  .insert({ userId, title })
  .select('message_id')
  return res[0]
}



// 保存消息列表
const saveMessageList =async function (message_id,message) {
  console.log(message_id,'message_id');
  let res = await db('message_list').where({message_id}).first()
  if(res){
   await db('message_list')
    .where({message_id})
    .update('message', message)
  }else {
    await db('message_list')
    .insert({ message,message_id })
    .select('message_id')
  }

 }


 // 获取消息列表
  const getChatList =async function () {
    let res = await db('message_info')
    .select('*')
    return res
  }


  // 获取消息
  const getMessage =async function (message_id) {
    let res = await db('message_list')
    .where({message_id})
    .select('*')
    return res
  }






 module.exports = {
  createChat,
  getChatList,
  getMessage,
  saveMessageList
 }
