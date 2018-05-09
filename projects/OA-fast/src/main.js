import './assets/css/comm.css'
// require('babel-polyfill')
import Vue from 'vue'
import router from './router'
import App from './app.vue'

import simpleMsg from './modules/msg-mobile/simple-msg-vue'
// import querystring from './modules/querystring/querystring-vue'
// import axios from './modules/axios-vue'
import preloaderFull from './modules/preloader-full/preloader-full'
import $preloaderFull from './modules/preloader-full/preloader-full-vue'
// import slideSelect from './modules/slide-select/src/slide-select-vue'

let bus = new Vue({
  data: {
  }
})

Vue.use(simpleMsg)
// Vue.use(querystring)
// Vue.use(axios)
Vue.use($preloaderFull)
// Vue.use(slideSelect)

router.beforeEach((to, from, next) => {
  // if (to.name !== 'Login' && !bus.isLogged) {
  //   next({name: 'Login'})
  // } else if (to.name === 'Login' && bus.isLogged) {
  //   next({name: 'Home'})
  // } else {
  //   preloaderFull.show({time: 200})
  //   document.title = to.meta.title
  //   next()
  // }
  preloaderFull.show({time: 200})
  document.title = to.meta.title
  next()
})
router.afterEach(() => {
  preloaderFull.close()
})

/* eslint-disable no-new */
new Vue({
  data: {
    bus
  },
  el: '#app',
  router,
  // 根实例用可实现替换绑定的元素
  template: '<app :bus="bus"/>',
  components: {
    App
  }
})

// router.push({name: 'LeaveDet'})
