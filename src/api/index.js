import fetch from '../lib/axios/fetch'
const getData = (data = {}) => {
  return fetch('/api/user/user_list', data)
}

export {
  getData
}