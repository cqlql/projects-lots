import Vue, { VNode } from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

const routes: RouteConfig[] = [
  // {
  //   path: '/editor',
  //   component: require('@/components/editor/Demo.vue').default
  // },
  // {
  //   path: '/mobile-banner2',
  //   component: require('@/components/mobile-banner2/demo/index.vue').default
  // },
  // {
  //   path: '/mobile-banner2-PcFullWidth',
  //   component: require('@/components/mobile-banner2/demo/PcFullWidth.vue').default
  // },
  {
    path: '/image-crop-pc',
    component: require('@/components/image-crop-pc/Demo.vue').default
  },
  {
    path: '/image-crop',
    component: require('@/components/image-crop/Demo.vue').default
  },
  {
    path: '/confirm',
    component: require('@/components/confirm/demo.vue').default
  },
  {
    path: '/bottom-load',
    component: require('@/components/bottom-load/demo/Index.vue').default
  },
  {
    path: '/switch-one',
    component: require('@/components/switch-one/demo/Index.vue').default
  },
  {
    path: '/popup',
    component: require('@/components/popup/demo.vue').default
  },
  // {
  //   path: '/scroller',
  //   component: require('@/components/scroller/demo.vue').default
  // },
  // {
  //   path: '/tabs',
  //   component: require('@/components/tabs/demo.vue').default
  // },
  // {
  //   path: '/switch-one',
  //   component: require('@/components/switch-one/demo/Index.vue').default
  // },
]

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
