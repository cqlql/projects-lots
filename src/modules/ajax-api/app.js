import Vue from 'vue'
import excuIntervalTry from '../corejs/excu/excu-interval-try'
let id = 0
function urlHandle (url) {
  if (process.env.NODE_ENV !== 'production') {
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
  post (url, data) {
    const { loading, toast } = Vue
    return new Promise((resolve, reject) => {
      const name = '__requestCallback' + (++id)
      loading.show()
      window[name] = data => {
        loading.hide()
        const result = this.dataHandle(data)
        if (result instanceof Error) {
          // 失败
          reject(result)
        } else {
          // 成功
          resolve(result)
        }
        delete window[name]
      }
      excuIntervalTry(() => {
        if (window.NativeJsFunQues) {
          window.NativeJsFunQues.CommonMethod(urlHandle(url), 'POST', data ? JSON.stringify(data) : '', name)
          return false
        }
      }, () => {
        // 失败
        loading.hide()
        toast('请求超时')
        reject(new Error('请求超时'))
      })
    })
  }
}
