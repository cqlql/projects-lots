/* eslint-disable comma-dangle */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 此处加入测试 demo
let routes = [
  // {
  //   path: '/test',
  //   meta: { title: '实验室' },
  //   component: require('./test.vue').default
  // },
  // {
  //   path: '/buttons',
  //   meta: { title: '基础组件-按钮' },
  //   component: require('@/components/buttons/demo.vue').default
  // },
  {
    path: '/load-refresh',
    meta: { title: '下拉刷新+到底加载' },
    component: require('@/components/load-refresh/demo.vue').default
  },
  {
    path: '/load-refresh-nodata',
    meta: { title: '下拉刷新+到底加载-无数据情况' },
    component: require('@/components/load-refresh/Demo.NoData.vue').default
  },
  {
    path: '/pulldown-refresh',
    meta: { title: '下拉刷新-无数据情况' },
    component: require('@/components/pulldown-refresh/Demo.NoData.vue').default
  },
  // {
  //   path: '/slide-select',
  //   meta: { title: '滑动选择' },
  //   component: require('@/components/slide-select/demo.vue').default
  // },
  // {
  //   path: '/slide-select-date',
  //   meta: { title: '滑动选择-日期时间' },
  //   component: require('@/components/slide-select-date/demo.vue').default
  // },
  // {
  //   path: '/list-select-part',
  //   meta: { title: '列表选择下拉部分' },
  //   component: require('@/components/list-select-part/demo.vue').default
  // },
  // {
  //   path: '/slide-select-date-future',
  //   meta: { title: '滑动选择-未来日期时间' },
  //   component: require('@/components/slide-select-date/DateTimeFuture.demo.vue').default
  // },
  // {
  //   path: '/mobile-slide',
  //   meta: { title: '移动端幻灯片' },
  //   component: require('@/components/mobile-slide/demo.vue').default
  // },
  // {
  //   path: '/animation',
  //   meta: { title: '动画测试' },
  //   component: require('@/modules/corejs/animation/transition.demo.vue').default
  // },
  // {
  //   path: '/animation2',
  //   meta: { title: '动画测试2' },
  //   component: require('@/modules/corejs/animation/transition-transform.demo.vue').default
  // },
  // {
  //   path: '/switch-multi',
  //   meta: { title: 'switch-multi' },
  //   component: require('@/modules/switch-multi/demo.vue').default
  // },
  // {
  //   path: '/switch-one',
  //   meta: { title: 'switch-one' },
  //   component: require('@/modules/switch-one/demo.vue').default
  // }
]

routes.push({
  path: '*',
  name: 'navDev',
  meta: { title: '快捷导航-dev' },
  component: {
    render () {
      const h2Style = { padding: '20px 6px 0', 'font-size': '16px' }
      const pStyle = { padding: '4px 10px' }
      const aStyle = { color: 'blue', 'text-decoration': 'underline' }

      const links = []
      routes.forEach(route => {
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
})

export default new Router({
  routes
})
