const MyPromise = require('./promise/src/index.js')
// Promise 一个构造函数
// new Promise() ---> object -> 操作一系列的异步操作，最终获取操作后的结果
// this is my promise that I can handle it

// promise init: pending -> resolved or rejected  -> sucess: value  or failure: reason

const p = new MyPromise((resolve, reject) => {
  const time = Date.now()
  if (time % 2 === 0) {
    resolve('成功', time)
  } else {
    reject('失败', time)
  }
})

p.then((value) => console.log('value', value), (reason) => console.log('reason', reason))