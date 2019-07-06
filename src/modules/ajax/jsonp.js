import loadJs from '../corejs/dom/script-load'
import querystring from '../corejs/url/querystring'
let count = 0
export default function jsonp ({ url, data }) {
  return new Promise(function (resolve, reject) {
    count++
    let now = Date.now()
    let idName = 'jp_' + count + '_' + now

    function clear () {
      delete window[idName]
      clearTimeout(timeId)
    }

    let timeId = setTimeout(function () {
      clear()
      reject(new Error(`JSONP request to ${url} timed out`))
    }, 30000)

    window[idName] = function (d) {
      clear()
      resolve(d)
    }

    loadJs(url + '?' + querystring(data) + '&callback=' + idName + '&_=' + now).catch(() => {
      clear()
      reject(new Error(`JSONP request to ${url} failed`))
    })
  })
}
