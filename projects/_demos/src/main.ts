import '@/comm.css'
import Vue from 'vue'
import Toast from '@/components/toast/plugin'
// import App from '@/components/pulldown-refresh/demo/Index.vue'// 下拉刷新
// import App from '@/components/drag-view/demo/Index.vue'// 窗口宽拖动改变
// import App from '@/components/drag-bar/demo/Index.vue'// 窗口宽拖动改变 - 更高的可配置
// import App from '@/components/popup/demo.vue'// 窗口宽拖动改变 - 更高的可配置
import App from '@/modules/toast-js/demo.vue'// 窗口宽拖动改变 - 更高的可配置
// import App from '@/components/image-crop/Demo.vue'// 窗口宽拖动改变 - 更高的可配置

Vue.use(Toast)
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
