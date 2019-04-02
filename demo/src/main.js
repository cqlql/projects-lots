/* eslint-disable */
import '@/comm.css'
import '@/modules/corejs/common.js'
import '@/modules/corejs/em-auto.js'
import Vue from 'vue'
import App from './App.vue'
// import router from './router'

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   next()
// })
// router.afterEach(() => {
//   // loading.hide()
// })

new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
