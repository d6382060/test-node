const express = require('express');
const login = require('./src/login');
const { getUserInfo } = require('./src/module/user');
const { isLogin } = require('./src/module/check');
const { utc2cn } = require('./src/utils/index');
const { register } = require('./src/register');
const app = express();
const port = 8080;



app.use((req, res, next)=>{
  res.set({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
  })
  next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/login', (req, res) => {

  const { account, password } = req.body;
  // 判空
if(!account || !password){
  let message = !account ? '账号不能为空' : '密码不能为空';
  res.status(400).json({ message,code:10001 });
  return;
}

  login(account,password)
  .then(user=>{
    if(user){
      let CreationTime =utc2cn(user.CreationTime) 
      let Logtime = utc2cn(user.Logtime)
      res.json({data:{...user,CreationTime,Logtime},code:10000})
    }else {
      res.status(401).json({ message: '登录失败,请检查用户名或密码',code:10001 });
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
})




app.get('/protected',async (req,res)=>{
  const token = req.query?.token;
  const rwaToken = token === 'null' ? null : token;
  if(!rwaToken){
    res.status(401).json({ message: '登录失效',data:'ok',code:10002 });
    return;
  }
 let loginRes = await isLogin(token)
 if(loginRes){
 let userInfo = await getUserInfo(token)
 let CreationTime =utc2cn(userInfo.CreationTime) 
 let Logtime = utc2cn(userInfo.Logtime)
 return res.json({data:{...userInfo,CreationTime,Logtime},code:10000})
 }else {
  return res.status(401).json({ message: '用户不存在',data:'ok',code:10002 });
 }

})


// 用户注册
app.post('/register', (req, res) => {
  const { account, password } = req.body;
  // 判空
if(!account || !password){
  let message = !account ? '账号不能为空' : '密码不能为空';
  res.status(400).json({ message,code:10001 });
  return;
}
  register(account,password)
  .then(userId=>{
    res.json({data:{id:userId},code:10000,message:'注册成功'})
  }
  )
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: err,code:10001 });
  });
})


const { 
  createChat,
  getChatList,
  getMessage,
  saveMessageList
 } = require('./src/message');

// 创建聊天
app.post('/create_chat', async (req, res) => {
  let userInfo = await getUserInfo('sjk9fs77hj2ux94qfu27n')
  const { title, message } = req.body;
 let chatId = await createChat(userInfo.id,title,message)
 res.json({data:{chatId},code:10000})
})



// 获取消息列表
app.get('/get_chat_list', async (req, res) => {
  let messageList = await getChatList()
  res.json({data:messageList,code:10000})
})


// 获取消息
app.get('/get_message', async (req, res) => {
  const message_id = req.query?.message_id;

  let message = await getMessage(message_id)

  res.json({data:message,code:10000})
})

// 保存消息列表
app.post('/save_message_list', async (req, res) => {
  const { messageId, message } = req.body;
let result = await saveMessageList(messageId,message)

res.json({data:result,code:10000})

})


app.listen(port, () => {
  console.log('Server started on port.' +  port);
});