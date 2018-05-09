/* eslint-disable */
// import '@/assets/css/comm.css'
// import '@/modules/corejs/em-auto'

import Vue from 'vue'
import App from './App.vue'
import click from '@/modules/corejs/dom/click.vue.js'

Vue.use(click)

new Vue({
  el: '#app',
  template: `<div><App></App></div>`,
  components: {
    App
  }
})
