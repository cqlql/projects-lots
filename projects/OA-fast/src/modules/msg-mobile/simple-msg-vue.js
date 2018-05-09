import simpleMsg from './simple-msg'
export default {
  install (Vue) {
    Vue.prototype.$simpleMsg = function (msg) {
      simpleMsg(msg)
    }
  }
}
