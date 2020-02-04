let http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<h1>hello nodejs 112</h1>')
  res.end('res.end is required')
}).listen(3000)

console.log('http server is listening at port 3000');