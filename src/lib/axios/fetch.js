
import Axios from './axios'
import CancelToken from'./CancelToken'

const source = new CancelToken.source()
const pendingkey = {}
const instance = new Axios({
  baseUrl: 'http://www.web.com/index.php/',
  timeout: 1000,
  method: 'post',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// 请求拦截器
instance.interceptors.request.use((config) => {
  // 拦截多次重复请求 @todo
  config.cancelToken = source.token
  return config
}, (err) => Promise.reject(err))

// 响应拦截器
instance.interceptors.response.use((config) => {
  // 解除请求完的标识 @todo
  return config
}, (err) => {
  // 此处校验err是否是截断请求
})

const fetch = (url, data) => {
  return instance.request(url, {data}).then(res => {
    return res
  }, (error) => {
    return Promise.reject(error)
  })
}

export default fetch


