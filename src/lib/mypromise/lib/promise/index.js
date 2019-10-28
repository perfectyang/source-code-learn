// new Promise((resolve, reject) => {
//   resolve(1)
// }).then((value) => {
//   console.log('onResolved-1', value)
//   return Promise.reject(222)
// }, (reason) => {
//   console.log('onRejected-1', reason)
// }).then((value) => {
//   console.log('onResolved-2', value)
// }, (reason) => {
//   console.log('onRejected-2', reason)
// }).then((value) => {
//   console.log('onResolved-3', value)
// }, (reason) => {
//   console.log('onRejected-3', reason)
// })

function Promise(excutor) {
  this.status = 'pending'
  this.data = null
  this.deferQueue = []
  const self = this
  const resolve = function (value) {
    if (self.status !== 'pending') return
    self.status = 'resolved'
    self.data = value
    setTimeout(_ => {
      self.deferQueue.forEach((promise) => {
        promise.onResolved(self.data)
      })
    })
  }
  const reject = function (reason) {
    if (self.status !== 'pending') return
    self.status = 'rejected'
    self.data = reason
    setTimeout(_ => {
      self.deferQueue.forEach((promise) => {
        promise.onRejected(self.data)
      })
    })
  }
  try {
    excutor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  onRejected = typeof onResolved === 'function' ? onRejected : reason => {throw reason}
  const self = this
  return new Promise((resolve, reject) => {
    function handler(callback) {
      try {
        let result = callback(self.data)
        if (result instanceof Promise) { // 是promise返回的结果
          result.then(resolve, reject)
        } else { // 非promise
          resolve(result)
        }
      } catch (err) {
        reject(err)
      }
    }
    if (self.status === 'resolved') { // 立即执行
      setTimeout(_ => {
        handler(onResolved)
      })
    } else if(self.status === 'rejected') {
      setTimeout(_ => {
        handler(onRejected)
      })
    } else { // pending
      self.deferQueue.push({
        onResolved () {
          handler(onResolved)
        },
        onRejected () {
          handler(onRejected)
        }
      })
    }
  })
}

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => resolve(value))
}
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => reject(reason))
}

Promise.all = function (promises) {
  let count = 0
  const values = []
  return new Promise((resolve, reject) => {
    promises.forEach((promise, idx) => {
      promise.then((value) => {
        count += 1
        values[idx] = value
        if (count === promises.length) {
          resolve(values)
        }
      }, (reason) => {
        reject(reason)
      })
    })
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

Promise.prototype.finally = function (callback) {
  return this.then(
    value  => Promise.resolve(callback()).then(_ => value),
    reason => Promise.reject(callback()).then(_ => { throw reason })
  )
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then((value) => {
        resolve(value)
      }, (reason) => {
        reject(reason)
      })
    })
  })
}

Promise.any = function (promises) {
  let errIdx = 0
  let error = []
  return new Promise((resolve, reject) => {
    promises.forEach((promise, idx) => {
      promise.then((value) => {
        resolve(value)
      }, (reason) => {
        errIdx += 1
        error[idx] = reason
        if (errIdx === promises.length) {
          reject(error)
        }
      })
    })
  })
}


module.exports = Promise