/* eslint-disable */
import '@/comm.css'
// import '@/button.css'
import './scrollbar.css'
import '@/modules/corejs/common.js'
// import '@/modules/corejs/em-auto.js'
import Vue from 'vue'
// import App from './App.vue'
import router from './router'

import Toast from '@/components/toast/plugin'
Vue.use(Toast)

new Vue({
  el: '#app',
  router,
  render: h => <RouterView />
})
