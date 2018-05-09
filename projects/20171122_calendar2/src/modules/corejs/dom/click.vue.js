/* eslint-disable */


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

*/

import click from './click'

export default {
  install(Vue) {
    Vue.directive('click', {
      inserted: function (el, binding, vnode) {
        el._removeClick = click(el, function (e) {
          binding.value(e, vnode)
        })
      },
      unbind (el) {
        el._removeClick()
        delete el._removeClick
      }
    })
  }
}
