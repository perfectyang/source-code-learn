import {stringfyQueryString} from './utils'

function Adapter (config) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest()
    let data = config.data
    let url = config.baseUrl ?  config.baseUrl + config.url : config.url
    let querystring = ''
    let method = config.method || 'post'
    let headers = config.headers || {}
    if (config.method === 'get') {
      url = url + '?' + stringfyQueryString(data) // 拼在url后面
    } else if (config.method === 'post') {
      querystring = stringfyQueryString(data) // "foo=bar&lorem=ipsum"
    }
    request.open(method, url, true)
    request.timeout = config.timeout
    for (let key in headers) {
      request.setRequestHeader(key, headers[key])
    }

    request.withCredentials = config.withCredentials || false

    request.onreadystatechange = function () {
      let {status, readyState} = request
      if (readyState === 4) {
        if (status >= 200 && status < 300) { // 成功的状态码
          let response = {
            data: JSON.parse(request.response || request.responseText || '{}') ,
            status: request.status,
            statusText: request.statusText,
            config: config,
            request: request
          }
          resolve(response)
          request = null
        } else {
          reject({
            response: request.response
          })
        }
      }
    }

    if (config.cancelToken) {
      config.cancelToken.promise.then((reason) => {
        if (!request) return
        request.abort()
        request = null
        reject(reason)
      })
    }

    if (config.method === 'get') {
      request.send()
    } else if (config.method === 'post') {
      request.send(querystring)
    }
  })
}


export default Adapter