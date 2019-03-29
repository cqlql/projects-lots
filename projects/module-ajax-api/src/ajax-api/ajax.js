
// import ajaxApp from './app'
import axios from 'axios'

// let axios = ajaxWeb
// if (location.protocol === 'file:') {
//   axios = ajaxApp
// }

class AjaxGeneral {
  constructor (dataHandle) {
    if (dataHandle) {
      this.dataHandle = dataHandle
    } else {
      this.dataHandle = function (data) {
        if (data.status === 200) {
          return data.result
        }
        return new Error(data.message)
      }
    }
  }
  request (config) {
    // let { $loading: loading, $toast: toast } = Vue.prototype
    // let { hasLoading = true } = config
    // if (hasLoading) loading.show()
    if (process.env.NODE_ENV !== 'production') {
      // config.baseURL = '/online'
    }
    config.timeout = 60000
    config.headers = { 'X-Sd-token': this.token }
    return axios(config).then(({ data }) => {
      const result = this.dataHandle(data)
      // 失败情况
      if (result instanceof Error) {
        return Promise.reject(result)
      }
      // 成功情况
      // if (hasLoading) loading.hide()
      return result
    }).catch(e => {
      // if (hasLoading) loading.hide()
      // toast.error(e.message)
      return Promise.reject(e)
    })
  }
  get (url, config = {}) {
    config.method = 'get'
    config.url = url
    return this.request(config)
  }
  post (url, data, config = {}) {
    config.method = 'post'
    config.url = url
    config.data = data
    return this.request(config)
  }
}
export const ajaxLogin = new AjaxGeneral(function (data) {
  if (data.code === 0) {
    return data.result
  }
  return new Error(data.message)
})

export default new AjaxGeneral()
