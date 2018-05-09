/* eslint-disable */
import loadJs from '../dom/load-js'
import searchString from '../url/search-string'
let count = 0
export default function jsonp ({url, data}) {
  return new Promise(function (resolve, reject) {
    count++
    let now = Date.now()
    let idName = 'jp_' + count + '_' + now

    function clear () {
      delete window[idName]
      clearTimeout(timeId)
      script.remove()
    }

    let timeId = setTimeout(function () {
      clear()
      reject(new Error(`JSONP request to ${url} timed out`))
    }, 30000)

    window[idName] = function (d) {
      clear()
      resolve(d)
    }

    let script = loadJs({
      src: url + '?' + searchString(data) + '&callback=' + idName + '&_=' + now,
      onerror () {
        clear()
        reject(new Error(`JSONP request to ${url} failed`))
      }
    })
  })
}
