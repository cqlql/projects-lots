import Vue, { VNode } from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

const routes: RouteConfig[] = []

// 加载所有
// const modules = require.context('@', true, /^\.\/components\/.+\/(demo\/index\.vue)$/)
// 加载所有 包括 package.json
// const modules = require.context('@', true, /^\.\/components\/.+\/(demo\/index\.vue|package\.json)$/)
 // 加载指定
// const modules = require.context('@', true, /^\.\/(components|modules)\/.+\/load-once2\/(demo\/index\.vue)$/) // load-once2
// const modules = require.context('@', true, /^\.\/components\/(upload-label|upload-images)\/(demo\/index\.vue|package\.json)$/) // upload-label upload-images
const modules = require.context('@', true, /^\.\/modules\/corejs\/dom\/demo\/outside-close.vue$/)

modules.keys().forEach((path: string) => {
  let regArr = path.match(/([^/]+)\/demo\//)
  if (regArr) {
    let name = regArr[1]
    // let info = modules(path.replace(/demo.+/, '') + 'package.json')
    routes.push({
      path: '/' + name,
      meta: {
        title: name
      },
      component: modules(path).default
    })
  }
})

export default new Router({
  routes: [
    ...routes,
    {
      path: '*',
      meta: { title: '快捷导航-dev' },
      component: {
        render () {
          const h2Style = { padding: '20px 6px 0', 'font-size': '16px' }
          const pStyle = { }
          const aStyle = { display: 'block', padding: '4px 10px', color: 'blue', }
    
          const links: VNode[] = []
          routes.forEach((route: RouteConfig) => {
            if (route.path !== '*') links.push(<p style={pStyle}><router-link to={route.path} style={aStyle}>{(route.meta && route.meta.title) || route.path}</router-link></p>)
          })
          return (
            <div>
              <h2 style={h2Style}>demos</h2>
              {links}
            </div>
          )
        }
      }
    }
  ]
})
