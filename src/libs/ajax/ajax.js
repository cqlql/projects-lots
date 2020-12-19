import querystring from '@/libs/corejs/url/querystring.js'
function ajax (config) {
  return new Promise((resolve, reject) => {
    let { url, method = 'GET', params, responseType = 'json' } = config
    method = method.toUpperCase()
    const xhr = new XMLHttpRequest()
    function readystatechange () {
      if (xhr.readyState !== 4) return
      // if (xhr.readyState === xhr.DONE) return
      if (xhr.status === 200) {
        const response = xhr.response

        // android 4.4以下，ajax不会根据后台响应要求自动转换 json为对象。所以只能手动转换
        if (responseType === 'json' && typeof response === 'string') {
          resolve(JSON.parse(response))
        } else {
          resolve(response)
        }
      } else {
        reject(new Error(method + ' ' + xhr.responseURL + ' ' + xhr.statusText))
      }
    }

    try {
      xhr.responseType = responseType
      xhr.onreadystatechange = readystatechange
    } catch (e) {
      xhr.onload = readystatechange
    }

    if (params) {
      url += ((url.lastIndexOf('?') > -1) ? '&' : '?') + querystring(params)
    }

    xhr.open(method, url)
    switch (method) {
      case 'POST':
        postSend(xhr, config)
        break
      case 'GET':
        xhr.send(null)
        break
    }
  })
}
function postSend (xhr, { data }) {
  if (data) {
    // 发送的数据类型
    if (typeof data === 'string') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8') // 发送的数据类型
      xhr.send(data)
    } else if (typeof data === 'object') {
      xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8') // 发送的数据类型
      xhr.send(JSON.stringify(data))
    }
  }
}

ajax.post = function (url, data, config = {}) {
  config.method = 'POST'
  config.url = url
  config.data = data
  return ajax(config)
}
ajax.get = function (url, config = {}) {
  config.method = 'GET'
  config.url = url
  return ajax(config)
}

export default ajax
