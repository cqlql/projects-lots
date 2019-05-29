import Vue, { VNode } from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

const routes: RouteConfig[] = []

const modules = require.context('@', true, /^\.\/components\/.+\/demo\/index\.vue$/)

modules.keys().forEach((path: string) => {
  let name = (path.match(/([^/]+)\/demo\//) as string[])[1]
  routes.push({
    path: '/' + name,
    component: modules(path).default
  })
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
