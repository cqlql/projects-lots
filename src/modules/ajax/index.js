import ajax from './ajax-comm'
import Vue from 'vue'
const loading = Vue.prototype.$loading

ajax.loadingClose = function () {
  loading.hide()
}
ajax.loadingShow = function () {
  loading.show()
}
