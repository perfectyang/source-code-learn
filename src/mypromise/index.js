// class MyPromise {
//   constructor (excutor) {
//     if (typeof excutor !== 'function') {
//       throw new TypeError(`promiseor is not function`)
//     }
//     const resolve = (args) => {
//       console.log(args)
//     }
//     excutor(this.resolve, this.reject)
//   }
//   resolve () {}
//   reject () {}
// }

// module.exports = MyPromise

new Promise((resolve, reject) => {
  resolve(1)
}).then(
  (val) => {
    console.log('val1', val)
    // return Promise.reject(2)
    return new Promise(() => {})
  },
  (reason) => console.log('reason1', reason)
).then(
  (val) => console.log('val2', val),
  (reason) => console.log('reason2', reason)
)
console.log('是否同步111')
