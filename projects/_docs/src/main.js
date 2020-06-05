/* eslint-disable */
import '@/comm.css'
import '@/button.css'
import './scrollbar.css'
import '@/utils/corejs/common.js'
// import '@/utils/corejs/em-auto.js'
import Vue from 'vue'
// import App from './App.vue'
import router from './router'

import Loading from '@/components/loading/plugin'
import Toast from '@/components/toast/plugin'
import Confirm from '@/components/confirm/plugin'
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Confirm)

new Vue({
  el: '#app',
  router,
  render: h => <RouterView />
})
