/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'

import Toast from '@/components/toast/plugin'
Vue.use(Toast)
new Vue({
  el: '#app',
  render: h => h(App)
})
