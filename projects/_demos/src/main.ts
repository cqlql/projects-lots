import '@/comm.css'
import Vue from 'vue'

import App from '@/components/pulldown-refresh/demo/Index.vue'// 下拉刷新

// import App from './App.vue'
// import router from './router'

// Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title || ''
//   next()
// })

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
