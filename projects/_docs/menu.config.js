
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
      // {
      //   name: 'scroll-bottom-load(到底加载)',
      //   path: '/scroll-bottom-load',
      //   demo: () => import(/* webpackChunkName: "scroll-bottom-load" */ '@/components/scroll-bottom-load/demo.vue'),
      //   docs: () => import(/* webpackChunkName: "scroll-bottom-load" */ '@/components/scroll-bottom-load/README.md')
      // },
      {
        name: 'scroll-bottom-load-page(到底加载+集成翻页)',
        path: '/scroll-bottom-load-page',
        // 是否在菜单可见
        // 只其他文档中当链接使用，不出现在菜单列表中
        // show: false,
        demo: () => import(/* webpackChunkName: "scroll-bottom-load" */ '@/components/scroll-bottom-load/Demo.page.vue'),
        docs: () => import(/* webpackChunkName: "scroll-bottom-load" */ '@/components/scroll-bottom-load/README.md')
      },
      {
        name: 'buttons',
        path: '/buttons',
        demo: () => import(/* webpackChunkName: "buttons" */ '@/components/buttons/demo.vue'),
        // docs: () => import(/* webpackChunkName: "buttons" */ '@/components/scroll-bottom-load/README.md')
      }
    ],
  },
  {
    name: 'image-crop(裁图)',
    path: '/image-crop',
    demo: () => import(/* webpackChunkName: "image-crop" */ '@/components/image-crop/Demo.vue'),
  },
  {
    name: 'v-transition (常用 vue transition 动画)',
    path: '/v-transition',
    demo: () => import(/* webpackChunkName: "v-transition" */ '@/components/v-transition/demo.vue'),
    docs: () => import(/* webpackChunkName: "v-transition" */ '@/components/v-transition/README.md'),
  }
]
