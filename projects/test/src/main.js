/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'

let bus = new Vue({
  data: {
    userId: 1
  }
})

Vue.prototype.$bus = bus
Vue.prototype.$userId = 2

new Vue({
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  }
})

new Vue({
  el: '#app',
  data: {
    t: 123
  },
  template: `<App/>`,
  components: {
    App
  }
})
