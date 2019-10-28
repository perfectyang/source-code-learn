import Adapter from './Adapter'

function dispatchRequest(config) {
  console.log('进来这里了吗')
  return Adapter(config).then((response) => {
    console.log('response', response)
    return response
  }, (reason) => {
    console.log('reason', reason)
    return Promise.reject(reason)
  })
}


export default dispatchRequest