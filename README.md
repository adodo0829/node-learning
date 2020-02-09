# node重温
[中文文档]http://nodejs.cn/api/

## node特性
单线程  
异步(非阻塞) I/O(回调函数实现)  
事件循环(EventEmitter)  

```
阻塞: 线程调度的一种方式, 线程在执行任务的过程中遇到耗时 I/O操作  
会被系统暂时剥夺执行权,将资源让给其他线程; 所以阻塞模式下采用多线程才能处理多任务  

异步式I/O: 当线程遇到 I/O 操作时，不会以阻塞的方式等待 I/O 操作 的完成或数据的返回,
而只是将 I/O 请求发送给操作系统, 继续执行下一条语句, 当操作 系统完成 I/O 操作时, 
以事件的形式通知执行 I/O 操作的线程，线程会在特定时候处理这个事件。  
为了处理异步 I/O，线程必须有事件循环，不断地检查有没有未处理的事件，依次予以处理。
```
- 单线程事件驱动的异步式I/O VS 传统的多线程阻塞式I/O 
```
异步式 I/O: 减少多线程开销,充分利用 cpu 资源, 编码控制流不易追溯  
阻塞(同步)式I/O: 通过多核多线程实现多任务, 资源消耗大, 线性控制流  
```
- node 的事件循环机制
```
Node.js 程序由事件循环开始，到事件循环结束，所有的逻辑都是事件的回调函数，所以 Node.js 始终在事件循环中，
程序入口就是 事件循环第一个事件的回调函数. 
事件的回调函数在执行的过程中，可能会发出 I/O 请求或 直接发射(emit)事件，执行完毕后再返回事件循环, 
事件循环会检查事件队列中有没有未处理的事件，直到程序结束
```
- 模块和包
```
模块,包本质上都是一个 nodejs 文件, 某个功能的集合
module.exports = xxx; exports.xxx = xxx
let xxx = require('xxx')

一个包需要包含 package.json 文件
```

## node核心模块
- 全局对象与变量
```
// global: 宿主, 全局对象, 其属性为全局变量
global = {
  process: { 当前 node 的进程状态 }
  process.nextTick(cb)为事件循环设置一项任务，Node.js 会在 下次事件循环调响应时调用 callback。  
  console,
  ...
}
```
- 实用工具 util(参考文档)
```
const util = require('util');

// util.inherits(subFunc, parentFunc)

// util.inspect: object => string
let obj = {
  name: 'huhua',
  say: () => { },
  skill: ['node', 'vue', 'ts']
}
console.log(obj)
console.log(util.inspect(obj))
```
- 事件驱动 events
events 模块只提供了一个对象: events.EventEmitter, 是事件发射与事件监听器功能的封装
```
// 事件发射器 && 事件监听器

// 引入事件模块对象
const events = require('events');

// 创建一个事件模块实例
let event1 = new events.EventEmitter()

// 事件监听器
// 指定事件名 & 回调
event1.on('myEvent', (param1, param2) => {
  console.log('回调 1', param1, param2);
})
event1.on('myEvent', (param1, param2) => {
  console.log('回调 2', param1, param2);
})

// 事件发射器
// 当事件发射时,注册到这个事件的事件监听器被依次调用,
// 事件参数作为回调函数参数传递。
event1.emit('myEvent', 'huhua', '24')
```
```
EventEmitter.on(event, listener) 为指定事件注册一个监听器，接受一个字
符串event 和一个回调函数listener。
EventEmitter.emit(event, [arg1], [arg2], [...]) 发射 event 事件，传递若干可选参数到事件监听器的参数表。
EventEmitter.once(event, listener) 为指定事件注册一个单次监听器，即
监听器最多只会触发一次，触发后立刻解除该监听器。
EventEmitter.removeListener(event, listener) 移除指定事件的某个监听
器，listener 必须是该事件已经注册过的监听器。
EventEmitter.removeAllListeners([event]) 移除所有事件的所有监听器， 如果指定 event，则移除指定事件的所有监听器。
```

- 文件模块 fs
fs提供了文件的读取、写入、更名、删除、遍历目录等功能...
```
const fs = require('fs')

fs.readFile('app.js', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data);
  }
})
// 相关 api: http://nodejs.cn/api/fs.html
```
- http模块
```
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
```
## 第三方模块express
MVC架构
```
路由控制
静态文件
模板引擎(模板+数据=>页面)
rest风格(增删改查: post,delete,put,get), 安全性
数据库
会话功能: http 无状态, 无法记录上一次浏览的数据
```
## 其他
- 模块加载机制
```
加载优先级:
内置核心模块
自建文件模块
加载方式: 路径加载
加载缓存: 按文件名缓存
```
- 控制流
```
Node异步机制核心: 事件 + 回调函数
待解决的问题: 回调嵌套的模式
```
- node 应用部署
```
重启机制
日志记录
cpu多核利用率: cluster多核进程
端口代理
共享 80 端口: 虚拟主机, Nginx 反向代理实现
server {
    listen 80;
    server_name node-demo.com;
    location / {
      proxy_pass http://localhost:3000;
    }
  }
```
## node的优劣
特点: 单线程, 事件驱动, 异步编程
适用场景:
```
处理I/O密集型任务
逻辑简单访问次数多的任务
```
不适用场景:
```
计算密集型任务, 响应速度跟不上
单用户多任务, 无进程锁, 不易协作
逻辑复杂, 非线性流程
国际化应用, 支持不够
```