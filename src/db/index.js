// 连接数据库
const knex = require('knex');
require('dotenv').config();
// 获取host
const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
console.log('host', host);

const db = knex({
  client: "mysql",
  connection: {
    host,
    port,
    user,
    password,
    database: "chat-api-user",
  },
});
module.exports = db;