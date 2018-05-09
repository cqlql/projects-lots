/* eslint-disable */
/* import customScroll from './customScroll'

const positionElem = document.getElementsByTagName('th')[1]

info.innerHTML = 1 + '周' + 2 + '周' + 3 + '周'
customScroll({
  totalNum: 12,
  onChange (q1, q2, q3) {
    info.innerHTML = q1 + '周' + q2 + '周' + q3 + '周'
    // console.log('显示：', q1 + '周', q2 + '周', q3 + '周')
  },
  // 位置元素。定位在此元素的右上角
  positionElem
})
 */
import App from './App.vue'
import scriptLoad from '@/modules/corejs/dom/script-load'

scriptLoad('http://p2y63v1s4.bkt.clouddn.com/vue/2.5.13/vue.min.js').then(() => {
  new Vue({
    el: '#app',
    // 根实例用可实现替换绑定的元素
    template: '<app/>',
    components: {
      App
    }
  })
})
