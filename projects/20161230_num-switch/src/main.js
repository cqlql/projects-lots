/* eslint-disable */
// import '@/assets/css/comm.css'
// import '@/modules/corejs/em-auto'

import Vue from 'vue'
// import App from './App.vue'
import App from './modules/num-switch/Main'
import click from './modules/corejs/dom/click.vue'

Vue.use(click)

new Vue({
  el: '#app',
  template: `<App></App>`,
  components: {
    App
  }
})
