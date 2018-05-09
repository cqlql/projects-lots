import './assets/css/comm.css'
// require('babel-polyfill')

import Vue from 'vue'
import router from './router'
import App from './app.vue'

import simpleMsg from './modules/msg-mobile/simple-msg-vue'
// import preloaderFull from './modules/preloader-full/preloader-full'
import $preloaderFull from './modules/preloader-full/preloader-full-vue'
import click from './modules/click/click.vue'
import inputNumber from './modules/input-number.vue'
import './modules/em-auto'

Vue.use(simpleMsg)
Vue.use($preloaderFull)
Vue.use(click)
Vue.use(inputNumber)

// router.beforeEach((to, from, next) => {
//   preloaderFull.show({time: 200})
//   document.title = to.meta.title
//   next()
// })
// router.afterEach(() => {
//   preloaderFull.close()
// })

let name = localStorage.getItem('name') || ''
let mode = localStorage.getItem('mode') || '1'
let timeType = localStorage.getItem('timeType') || '1'
let timeMinute = localStorage.getItem('timeMinute') || '3'

let bus = new Vue({
  data: {
    name,
    mode,
    timeType,
    timeMinute
  },
  watch: {
    name (v) {
      localStorage.setItem('name', v)
    },
    mode (v) {
      localStorage.setItem('mode', v)
    },
    timeType (v) {
      localStorage.setItem('timeType', v)
    },
    timeMinute (v) {
      localStorage.setItem('timeMinute', v)
    }
  },
  computed: {
    timeCount () {
      return (this.timeMinute || 3) * 60
    }
  }
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

// router.push({name: 'Practice'})
