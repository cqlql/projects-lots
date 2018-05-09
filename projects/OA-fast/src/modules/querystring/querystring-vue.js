import querystring from './querystring'
export default {
  install (Vue) {
    Vue.prototype.$querystring = function (obj) {
      return querystring(obj)
    }
  }
}
