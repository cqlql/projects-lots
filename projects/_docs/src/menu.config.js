
export default [
  {
    name: '项目说明',
    path: '/readme',
    docs: () => import(/* webpackChunkName: "docs1" */ '@/../README.md'),
  },
  {
    name: 'UI组件',
    children: [
      {
        name: 'toast(简易的消息提示框)',
        path: '/toast',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/toast/demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/toast/README.md')
      },
      {
        name: 'bottom-load(到底加载)',
        path: '/bottom-load',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/bottom-load/BottomLoad.demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/bottom-load/README.md')
      },
      // {
      //   name: 'scroll-bottom-load-page(到底加载+集成翻页)',
      //   path: '/scroll-bottom-load-page',
      //   // 是否在菜单可见
      //   // 只其他文档中当链接使用，不出现在菜单列表中
      //   // show: false,
      //   demo: () => import(/* webpackChunkName: "docs1" */ '@/components/scroll-bottom-load/Demo.page.vue'),
      //   docs: () => import(/* webpackChunkName: "docs1" */ '@/components/scroll-bottom-load/README.md')
      // },
      {
        name: 'buttons',
        path: '/buttons',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/buttons/demo.vue'),
        // docs: () => import(/* webpackChunkName: "docs1" */ '@/components/scroll-bottom-load/README.md')
      },
      {
        name: 'pulldown-refresh(下拉刷新)',
        path: '/pulldown-refresh',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/pulldown-refresh/PulldownRefresh.demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/pulldown-refresh/README.md')
      },
      {
        name: 'pulldown-refresh-plus(下拉刷新+到底加载)',
        path: '/pulldown-refresh-plus',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/pulldown-refresh/PulldownRefreshPlus.demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/pulldown-refresh/README.md')
      },
      {
        name: 'pulldown-refresh-plus-elem(下拉刷新+到底加载+以元素为容器)',
        path: '/pulldown-refresh-plus-elem',
        show: false,
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/pulldown-refresh/PulldownRefreshPlus.elem.demo.vue'),
        // docs: () => import(/* webpackChunkName: "docs1" */ '@/components/pulldown-refresh/README.md')
      }
    ],
  },
  {
    name: 'zoom-touch(触摸捏合放大)',
    path: '/zoom-touch',
    demo: () => import(/* webpackChunkName: "docs1" */ '@/modules/zoom-touch/demo.vue'),
    docs: () => import(/* webpackChunkName: "docs1" */ '@/modules/zoom-touch/README.md'),
  },
  {
    name: 'image-crop(裁图)',
    path: '/image-crop',
    demo: () => import(/* webpackChunkName: "docs1" */ '@/components/image-crop/Demo.vue'),
  },
  // {
  //   name: 'v-transition (常用 vue transition 动画)',
  //   path: '/v-transition',
  //   demo: () => import(/* webpackChunkName: "docs1" */ '@/components/v-transition/demo.vue'),
  //   docs: () => import(/* webpackChunkName: "docs1" */ '@/components/v-transition/README.md'),
  // }
]