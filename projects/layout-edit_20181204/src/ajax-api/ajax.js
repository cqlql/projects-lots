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
  ajax ({ url, method, data, params, hasLoading = true }) {
    let { $loading: loading, $toast: toast } = Vue.prototype
    if (hasLoading) loading.show()
    return axios({
      method,
      url,
      // baseURL: '/mock',
      // baseURL: '/api/historylesson',
      data,
      params
    }).then(({ data }) => {
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
  get (url, { params } = {}) {
    return this.ajax({
      method: 'get',
      url,
      params
    })
  }
  post (url, data, { params } = {}) {
    return this.ajax({
      method: 'post',
      url,
      data,
      params
    })
  }
}

// window.AjaxWeb = AjaxWeb

export default AjaxWeb
