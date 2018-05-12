import './comm.css'
import Vue from 'vue'
import router from './router'
import App from './app.vue'

router.beforeEach((to, from, next) => {
  // preloaderFull.show()
  document.title = to.meta.title || ''
  next()
})
router.afterEach(() => {
  // preloaderFull.close()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 根实例用可实现替换绑定的元素
  template: '<app/>',
  components: {
    App
  }
})
