
const Promise = require('./index')
// new Promise((resolve, reject) => {
//   setTimeout(_ => {
//     resolve(1)
//   })
// }).then((value) => {
//   console.log('onResolved-1', value)
//   return Promise.reject(222)
// }, (reason) => {
//   console.log('onRejected-1', reason)
// }).catch((error) => {
//   console.log('error', error)
//   throw error
// }).then((value) => {
//   console.log('onResolved-2', value)
// }, (reason) => {
//   console.log('onRejected-2', reason)
// }).finally(() => {
//   console.log('最')
// })

// console.log('onResolved-1', 1)
// console.log('error', 222)
// console.log('onRejected-2', 222)

// Promise.all([Promise.resolve(1), Promise.reject(2)]).then((values) => {
//   console.log('values', values)
// }, (error) => {
//   console.log('error', error)
// })
// Promise.race([new Promise((resolve, reject) => {
//   setTimeout(_ => {
//     resolve(1)
//   }, 0)
// }), Promise.reject(323)]).then((values) => {
//   console.log('values', values)
// }, (error) => {
//   console.log('error', error)
// })

// Promise.allSettled([Promise.reject(1), Promise.resolve(2)]).then((value) => {

// })

Promise.any([Promise.reject(1), Promise.reject(3)]).then(
  (value) => {
     console.log('value', value)
  },
  (error) => {
    console.log('error', error)
  }
);
