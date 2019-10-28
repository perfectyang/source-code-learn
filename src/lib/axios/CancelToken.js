function Cancel(message) {
  this.message = message
}
Cancel.prototype.__CANCEL__ = true;


function CancelToken(excutor) {
  let resolveParam
  this.promise = new Promise((resolve, reject) => {
    resolveParam = resolve
  })
  let token = this
  excutor((message) => {
    if (token.reason) return
    token.reason = new Cancel(message)
    resolveParam(token.reason)
  })
}

CancelToken.source = function () {
  let resolveParam
  let token = new Promise((resolve, reject) => {
    resolveParam = resolve
  })
  return {
    token: token,
    cancel: resolveParam
  }
}

export default CancelToken