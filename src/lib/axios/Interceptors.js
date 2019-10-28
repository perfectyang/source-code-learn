
function Interceptors() {
  this.handlers = []
}

Interceptors.prototype.use = function (onResolved, onRejected) {
  this.handlers.push({
    onResolved: onResolved,
    onRejected: onRejected
  })
  return this.handlers.length - 1
}

Interceptors.prototype.reject = function (idx) {
  if (this.handlers[idx]) {
    this.handlers[idx] = null
  }
}

Interceptors.prototype.forEach = function (fn) {
  this.handlers.forEach((interceptors) => {
    fn(interceptors)
  })
}


export default Interceptors