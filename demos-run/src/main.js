/* eslint-disable */
import './comm.css'
import Vue from 'vue'
import router from './router'
import App from './app.vue'
import toast from '@/components/toast/plugin'
import loading from '@/components/loading/plugin'

Vue.use(toast)
Vue.use(loading)

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
  render: h => h(App)
})
