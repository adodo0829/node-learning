// 实用工具
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