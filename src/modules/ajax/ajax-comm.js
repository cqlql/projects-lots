import axios from 'axios'

export class AjaxComm {
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
    let { hasLoading = true } = config
    if (hasLoading) this.loadingShow()
    if (process.env.NODE_ENV !== 'production') {
      config.baseURL = require('@/dev.config.js').default.baseURL
    }
    config.timeout = 60000
    return axios(config).then(({ data }) => {
      const result = this.dataHandle(data)
      // 失败情况
      if (result instanceof Error) {
        return Promise.reject(result)
      }
      // 成功情况
      if (hasLoading) this.loadingClose()
      return result
    }).catch(e => {
      if (hasLoading) this.loadingClose()
      this.messageError(e.message)
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
  loadingShow () {}
  loadingClose () {}
  messageError (msg) {
    console.error(msg)
  }
  // 可以改为灵活配置 ajax 库
  // axios () {}
}

// .net 接口通用
export default new AjaxComm(function (data) {
  if (data.code === 0) {
    return data.data
  }
  return new Error(data.message)
})

// go 接口通用
// export const ajaxGo = new AjaxComm()
