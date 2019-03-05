import Vue from 'vue'
import excuIntervalTry from '../corejs/excu/excu-interval-try'
import querystring from '../corejs/url/querystring'

let hostLogin = 'http://api.shendupeiban.com'
let host = 'http://testing.shendupeiban.com'

let id = 0
function urlHandle (url) {
  if (process.env.NODE_ENV === 'production') {
    // 发布

    if (process.env.APP_TEST === 'true') {
      // 内网

      if (/comm\/v1\/token/.test(url)) {
        url = 'http://192.168.1.240:8086' + url
      } else {
        url = 'http://testing.shendupeiban.com' + url
      }
    } else {
      // 外网

      if (/comm\/v1\/token/.test(url)) {
        url = hostLogin + url
      } else {
        url = host + url
      }
    }
  } else {
    // mock 开发

    // url = '/mock' + url
  }
  return url
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
  request ({ url, method, params, data }) {
    const { loading, toast } = Vue
    return new Promise((resolve, reject) => {
      // 完成回调
      function finish (err, result) {
        if (err) {
          reject(err)
          toast(err.message)
        } else if (result) {
          resolve(result)
        }
        loading.hide()
        delete window[name]
      }
      // native 请求超时处理
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
      loading.show()
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
        // 失败：native 全局变量赋值超时
        finish(new Error('请求超时，window.NativeJsFunQues 不存在'))
      })
    })
  }
  get (url, config = {}) {
    config.method = 'GET'
    config.url = url
    return this.request(config)
  }
  post (url, data, config) {
    config.method = 'POST'
    config.url = url
    config.data = data
    return this.request(config)
  }
}
