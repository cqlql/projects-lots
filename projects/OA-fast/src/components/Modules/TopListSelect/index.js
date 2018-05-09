/* eslint-disable */
import Vue from 'vue'

var MyComponent = Vue.extend({
  data () {
    return {}
  },
  methods: {
    testfn () {
      console.log(this)
    }
  },
  render () {
    return <div>Hello!</div>
  }
})

var component = new MyComponent().$mount()

// var component = new Vue({
//   template: '<div>Hello!</div>',
//   // render () {
//   //   return <div onClick={alert}>Hello!</div>
//   // }
//   destroyed () {
//     console.log('销毁')
//   }
// })
// component.$mount()
document.body.appendChild(component.$el)

// setTimeout(function () {
//   // component.$destroy()
//   // console.log(component.$destroy)
//   component.$el.remove()
// }, 1000)
