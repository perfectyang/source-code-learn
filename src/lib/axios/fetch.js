
import Axios from './axios'
import CancelToken from'./CancelToken'

const axios = new Axios()
const source = new CancelToken()
const pendingkey = {}
const instance = axios.create({
  baseUrl: 'http://localhost:3000',
  timeout: 1000,
  method: 'post'
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
  return instance.request(url, {data})
}

export default fetch


