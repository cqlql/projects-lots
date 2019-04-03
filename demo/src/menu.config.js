
export default [
  {
    name: 'UI组件',
    children: [
      {
        name: 'toast(简易的消息提示框)',
        path: '/toast',
        demo: () => import(/* webpackChunkName: "toast" */ '@/components/toast/demo.vue'),
        docs: () => import(/* webpackChunkName: "toast" */ '@/components/toast/README.md')
      },
      {
        name: 'scroll-bottom-load(到底加载+集成翻页)',
        path: '/scroll-bottom-load-page',
        demo: () => import(/* webpackChunkName: "scroll-bottom-load" */ '@/components/scroll-bottom-load/Demo.page.vue'),
        docs: () => import(/* webpackChunkName: "scroll-bottom-load" */ '@/components/scroll-bottom-load/README.md')
      },
      {
        name: 'buttons',
        path: '/scroll-bottom-load-page',
        show: false, // 是否在菜单可见
        demo: () => import(/* webpackChunkName: "scroll-bottom-load" */ '@/components/scroll-bottom-load/Demo.page.vue'),
        docs: () => import(/* webpackChunkName: "scroll-bottom-load" */ '@/components/scroll-bottom-load/README.md')
      }
    ],
  }
]
