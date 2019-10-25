function MyPromise(excutor) {
  const self = this
  this.status = 'pending'
  this.data = null
  this.callbacks = []
  function resolve(value) {
    if (self.status !== 'pending') return
    self.status = 'resolved'
    self.data = value
    if (self.callbacks.length > 0) {
      setTimeout(_ => {
        self.callbacks.forEach(callbackObj => {
          callbackObj.onResolved(value)
        })
      })
    }
  }
  function reject(reason) {
    if (self.status !== 'pending') return
    self.status = 'rejected'
    self.data = reason
    if (self.callbacks.length > 0) {
      setTimeout(_ => {
        self.callbacks.forEach(callbackObj => {
          callbackObj.onRejected(reason)
        })
      })
    }
  }
  try {
    excutor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  onRejected = typeof onResolved === 'function' ? onRejected : reason => {throw reason}
  const self = this
  return new MyPromise((resolve, reject) => {
    function handle (callback) {
      try {
        let result = callback(self.data)
        if (result instanceof MyPromise) { // 2.是promise对象
          result.then(resolve, reject)
        } else { // 3.返回的不是promise
          resolve(result)
        }
      } catch (error) { // 1.抛出异常
        reject(error)
      }
    }
    if (self.status === 'resolved') {
      /*
      返回的结果，由onResolved或者onRejected执行结果来决定
      1. 抛出异常,返回的结果为失败，reason为异常
      2. 返回的结果是promise, 返回promise的结果就是这个结果
      3. 返回的结果是非promise, 返回promise为成功，value就是返回值
      */
     setTimeout(_ => {
        handle(onResolved)
     })
    } else if (self.status === 'rejected') {
      setTimeout(_ => {
        handle(onRejected)
      })
    } else { // status pending --- 这个是要存起来，到resolve里面去调用
      self.callbacks.push({
        onResolved (value) {
          handle(onResolved)
        },
        onRejected (reason) {
          handle(onRejected)
        }
      })
    }





  })

}

