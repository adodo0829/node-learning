// events.EventEmitter
// 事件发射器 && 事件监听器

// 引入事件模块对象
const events = require('events');

// 创建一个事件模块实例
let event1 = new events.EventEmitter()

// 监听一个事件, 指定事件名
event1.on('myEvent', (param1, param2) => {
  console.log('回调 1', param1, param2);
})
event1.on('myEvent', (param1, param2) => {
  console.log('回调 2', param1, param2);
})

// 触发事件发射器
event1.emit('myEvent', 'huhua', '24')