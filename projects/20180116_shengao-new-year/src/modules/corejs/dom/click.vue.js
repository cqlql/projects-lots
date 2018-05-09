/*
** 使用

先定义方法：
let vm = new Vue({
    methods:{
        clickFn(e){ }
    }
});

模版使用：
<input v-click="clickFn">
<input v-click="()=>{foo=123}">
*/

import click from './click'

export default {
  install (Vue) {
    Vue.directive('click', {
      inserted: function (el, binding, vnode) {
        el._removeClick = click(el, function (e) {
          binding.value(e, vnode)
        })
      },
      unbind (el) {
        if (el._removeClick) {
          el._removeClick()
          delete el._removeClick
        }
      }
    })
  }
}
