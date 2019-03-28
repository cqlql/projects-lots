import axios from 'axios'
// import Vue from 'vue'

function urlHandle (url) {
  if (process.env.NODE_ENV !== 'production') {
    // url = '/mock' + url
  }
  return url
}
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
  post (url, data, config) {
    // let { loading, toast } = Vue
    // loading.show()
    return axios.post(urlHandle(url), data, config).then(({ data }) => {
      const result = this.dataHandle(data)
      // 失败情况
      if (result instanceof Error) {
        return Promise.reject(result)
      }
      // 成功情况
      // loading.hide()
      return result
    }).catch(e => {
      // loading.hide()
      // toast(e.message)
      return Promise.reject(e)
    })
  }
}

export default AjaxWeb
