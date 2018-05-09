/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import click from '@/modules/corejs/dom/click.vue'
import popup from '@/modules/popup/popup-vue'
import $preloaderFull from '@/modules/preloader-full/preloader-full-vue'

Vue.use(popup)
Vue.use($preloaderFull)
Vue.use(click)

new Vue({
  el: '#app',
  template: `<div><App></App></div>`,
  components: {
    App
  }
})
