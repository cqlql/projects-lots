/* 一般 go 接口请求简化 */
import axios from './index'
import msgSimple from '@/modules/popup/msg-simple'
import preloaderFull from '@/modules/preloader-full/preloader-full'
// import querystring from '../querystring/querystring'
export default {
  get (url, config) {
    preloaderFull.show()
    return axios.get(url, config).then(({data}) => {
      data = typeof data === 'string' ? JSON.parse(data) : data
      if (data.status === 200) {
        return data.result
      }
      return Promise.reject(new Error(data.message))
    }).catch(e => {
      msgSimple(e)
    }).then(data => {
      preloaderFull.close()
      return data
    })
  },
  post (url, data, config) {
  }
}
