// utc转中国标准时间
var dayjs = require('dayjs')
function utc2cn(utc_datetime) {
  let cn_datetime = dayjs(utc_datetime).format('YYYY-MM-DD HH:mm:ss')
  return cn_datetime
}


module.exports={
  utc2cn
}