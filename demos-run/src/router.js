import Vue from 'vue'
import Router from 'vue-router'
import navDev from './nav-dev'

let routes = []

Vue.use(Router)

function importAll (r) {
  r.keys().forEach(key => {
    routes.push({
      path: key.match(/(\/[^/]+?)\/demo.vue/)[1],
      component: r(key).default
    })
  })
}
// 编译所有 demo
// importAll(require.context('@/', true, /^\.\/(components|modules)\/.+?\/demo\.vue$/))

// 编译指定 demo
importAll(require.context('@/', true, /^\.\/(components|modules)\/(debug-msg)\/demo\.vue$/))

navDev(routes)

export default new Router({
  routes: routes
})
