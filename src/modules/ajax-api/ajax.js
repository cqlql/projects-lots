import axios from 'axios'
import Vue from 'vue'

class AjaxWeb {
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
  ajax (config) {
    let { $loading: loading, $toast: toast } = Vue.prototype
    let { hasLoading = true } = config
    if (hasLoading) loading.show()
    if (process.env.NODE_ENV !== 'production') {
      Object.assign(config, {
        // baseURL: '/mock',
        // baseURL: '/api/historylesson',
      })
    }
    return axios(config).then(({ data }) => {
      const result = this.dataHandle(data)
      // 失败情况
      if (result instanceof Error) {
        return Promise.reject(result)
      }
      // 成功情况
      if (hasLoading) loading.hide()
      return result
    }).catch(e => {
      if (hasLoading) loading.hide()
      toast.error(e.message)
      return Promise.reject(e)
    })
  }
  get (url, config = {}) {
    config.method = 'get'
    config.url = url
    return this.ajax(config)
  }
  post (url, data, config = {}) {
    config.method = 'post'
    config.url = url
    config.data = data
    return this.ajax(config)
  }
}

// window.AjaxWeb = AjaxWeb

export default AjaxWeb
