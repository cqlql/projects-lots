import Vue from 'vue'
import Router from 'vue-router'

// 批量导入路由
let routes = []
function importAll (r) {
  r.keys().forEach(key => {
    routes = routes.concat(r(key).default)
  })
}

// 指定只打包具体 router
if (process.env.NODE_ENV === 'production') {
  // 正式环境
  importAll(require.context('./router', false, /(hello|hello2)\.js$/))
} else {
  // 开发环境
  importAll(require.context('./', true, /^\.\/router\/.+?\.js$|^\.\/nav-dev.js$/))
  // importAll(require.context('./', true, /^\.\/nav-dev.js$/))
}

Vue.use(Router)

export default new Router({
  routes: routes
})
