/**
 * 可通过实例重写覆盖或者直接 constructor 中带参覆盖 showLoading hideLoading messageError，
*/

export default class RequestCommon {
  constructor ({ dataHandle, axios }) {
    this.axios = axios
    if (dataHandle) {
      this.dataHandle = dataHandle
    } else {
      this.dataHandle = function (data) {
        if (data.code === 0) {
          return data.data
        }
        return new Error(data.message)
      }
    }
  }

  request (config) {
    config.timeout = 60000

    const { hasLoading = true } = config
    if (hasLoading) this.showLoading()

    // 开发环境专用配置
    // if (process.env.NODE_ENV !== 'production') {
    //   config.baseURL = require('@/dev.config.js').default.baseURL
    // }

    return this.axios(config).then(data => {
      const result = this.dataHandle(data)
      // 失败情况
      if (result instanceof Error) {
        return Promise.reject(result)
      }
      // 成功情况
      if (hasLoading) this.hideLoading()
      return result
    }).catch(e => {
      if (hasLoading) this.hideLoading()
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

  showLoading () {
    // wx.showLoading()
  }

  hideLoading () {
    // wx.hideLoading()
  }

  messageError (msg) {
    // wx.showToast({
    //   icon: 'none',
    //   title: msg
    // })
  }
}

// .net 接口通用
// export default new RequestCommon(function (data) {
//   if (data.code === 0) {
//     return data.data
//   }
//   return new Error(data.message)
// })

// go 接口通用
// export const ajaxGo = new AjaxComm()
