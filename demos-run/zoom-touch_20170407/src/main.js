/* eslint-disable */

// import './test.js'
import Vue from 'vue'
import App from './App.vue'
import '@/modules/zoom-touch/picture-zoom-popup-init'

// new Vue({
//   el: '#vueTest',
//   template: '<slide-select/>',
//   components: {
//     slideSelect
//   }
// })

new Vue({
  el: '#app',
  template: `<div>
<App></App>
</div>`,
  data: {
    show: 0,
    show2: 0
  },
  components: {
    App
  },
  methods: {
  }
})

