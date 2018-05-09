/* eslint-disable */
import './modules/css-base/transition.css'

// import './test.js'
import Vue from 'vue'
import App from './App.vue'

// new Vue({
//   el: '#vueTest',
//   template: '<slide-select/>',
//   components: {
//     slideSelect
//   }
// })

new Vue({
  el: '#vueTest',
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
    open () {
      this.show = 1
    },
    open2 () {
      this.show2 = 1
    },
    onSelect () {

    }
  }
})

