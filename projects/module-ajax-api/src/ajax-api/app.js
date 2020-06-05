// import Vue from 'vue'
import excuIntervalTry from '@/utils/corejs/excu/excu-interval-try'
import querystring from '@/utils/corejs/url/querystring'

// let hostLogin = 'http://api.shendupeiban.com'
let host = 'https://api.shendupeiban.com'

let id = 0
function urlHandle (url) {
  // if (/comm\/v1\/token/.test(url)) {
  //   url = hostLogin + url
  // } else {
  //   url = host + url
  // }
  return host + url
}
export default class {
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
  request ({ url, method, config = {}, data }) {
    const { params } = config
    // const { loading, toast } = Vue
    return new Promise((resolve, reject) => {
      // 完成回调
      function finish (err, result) {
        if (err) {
          reject(err)
          // toast.error(err.message)
        } else if (result) {
          resolve(result)
        }
        // loading.hide()
        delete window[name]
      }
      // native 超时处理
      const nativeTimeOut = {
        start () {
          this.timeId = setTimeout(function () {
            finish(new Error('native 请求超时'))
          }, 6000)
        },
        end () {
          clearTimeout(this.timeId)
        }
      }
      const name = '__requestCallback' + (++id)
      // loading.show()
      window[name] = data => {
        nativeTimeOut.end()
        const result = this.dataHandle(data)
        if (result instanceof Error) {
          // 失败
          finish(result)
        } else {
          // 成功
          finish(null, result)
        }
      }
      excuIntervalTry(() => {
        if (window.NativeJsFunQues) {
          nativeTimeOut.start()
          let querystr = params ? '?' + querystring(params) : ''
          window.NativeJsFunQues.CommonMethod(urlHandle(url) + querystr, method, data ? JSON.stringify(data) : '', name)
          return false
        }
      }, () => {
        // 失败
        finish(new Error('请求超时'))
      })
    })
  }
  get (url, config) {
    return this.request({
      url,
      method: 'GET',
      config
    })
  }
  post (url, data, config) {
    return this.request({
      url,
      method: 'POST',
      config,
      data
    })
  }
}
