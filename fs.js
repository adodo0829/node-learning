// 文件模块
const fs = require('fs')

fs.readFile('app.js', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data);
  }
})
// 相关 api: http://nodejs.cn/api/fs.html