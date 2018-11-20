/* eslint-disable */

// import Vue from 'vue'
// import App from './App.vue'

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

import App from './InputAutosuggest.vue'
import scriptLoad from '@/modules/corejs/dom/script-load'

scriptLoad('http://p2y63v1s4.bkt.clouddn.com/vue/2.5.13/vue.min.js').then(() => {
  new Vue({
    el: '#app',
    render: h => h(App)
  })
})
