

function Axios(config) {
  this.config = config
  this.interceptors = {
    request: new Interceptors,
    response: new Interceptors
  }
}

Axios.prototype.request = function(url, config) {
  let config = Object.assign(this.config, config, {url})
  let chain = [dispatchRequest, undefined]
  let promise = Promise.resolve(config)
  // 请求拦截器
  this.interceptors.request.forEach(({onResolved, onRejected}) => {
    chain.unshift(onResolved, onRejected)
  })
  // 响应拦截器
  this.interceptors.response.forEach(({onResolved, onRejected}) => {
    chain.push(onResolved, onRejected)
  })
  while(chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }
  return promise
}

export default Axios