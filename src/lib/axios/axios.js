
import Interceptors from './Interceptors'
import dispatchRequest from './dispatchRequest'
function Axios(localConfig) {
  this.config = localConfig
  this.interceptors = {
    request: new Interceptors,
    response: new Interceptors
  }
}

Axios.prototype.request = function(url, localConfig) {
  let config = Object.assign(this.config, localConfig, {url})
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