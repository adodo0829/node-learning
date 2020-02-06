const http = require('http');
// http 服务端
const server = new http.Server()
// 监听请求事件
server.on('request', (req, res) => {
  // console.log(req);
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<p>response body</p>');
  res.end()
})
// 开启服务
server.listen(3000, () => { console.log('listen port 3000') })

// **************************
// http 客户端
// http.get()
// http.request()
// let req = http.request(options, (res) => {
//   res.setEncoding('utf8');
//   res.on('data', (data) => {
//     console.log(data);
//   });
// });
// req.write(contents);
// req.end();