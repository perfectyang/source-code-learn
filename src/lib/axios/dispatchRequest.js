
function dispatchRequest(config) {
  let adapter = Adapter.default
  return adapter(config).then((response) => {
    return response
  }, (reason) => {
    return Promise.reject(reason)
  })
}


export default dispatchRequest