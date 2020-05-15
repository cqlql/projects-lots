/* 
path 用作 id，只有拥有 demo 才会注册为路由，没有 demo 可以当作 id 命名
没有 docs demo ，path 可以不设
*/
export default [
  {
    path: 'readme',
    name: '关于本网站',
    docs: () => import(/* webpackChunkName: "docs1" */ '../README.md'),
  },
  {
    name: '个人项目',
    children: [
      {
        name: '开发笔记',
        path: '/my-note',
        docs: () => import(/* webpackChunkName: "docs1" */ './docs/my-note.md'),
      },
      {
        name: '前端开发工程环境',
        path: '/template-vue',
        docs: () => import(/* webpackChunkName: "docs1" */ './docs/template-vue.md'),
      },
      {
        name: '个人项目集合',
        path: '/projects-lots',
        docs: () => import(/* webpackChunkName: "docs1" */ './docs/projects-lots.md'),
      }
    ]
  },
  {
    name: 'Vue UI组件',
    children: [
      {
        name: 'toast 轻提醒',
        path: '/toast',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/toast/demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/toast/README.md')
      },
      {
        name: 'bottom-load(到底加载)',
        path: '/bottom-load',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/bottom-load/demo/Index.vue'),
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
      // {
      //   name: 'buttons',
      //   path: '/buttons',
      //   demo: () => import(/* webpackChunkName: "docs1" */ '@/components/buttons/demo.vue'),
      //   // docs: () => import(/* webpackChunkName: "docs1" */ '@/components/scroll-bottom-load/README.md')
      // },
      {
        name: 'pulldown-refresh(下拉刷新+到底加载)',
        path: '/pulldown-refresh',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/pulldown-refresh/demo/Index.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/pulldown-refresh/README.md')
      },
      {
        name: '宽口宽拖动改变 - 简单、高度可配置',
        path: '/drag-bar',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/drag-bar/demo/Index.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/drag-bar/README.md'),
        env: 'pc'
      },
      {
        name: '宽口宽拖动改变',
        path: '/drag-view',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/drag-view/demo/Index.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/drag-view/README.md'),
        env: 'pc'
      },
    ],
  },
  {
    name: '其他',
    children: [
      {
        name: '圆周率记忆练习',
        path: 'https://cqlql.gitee.io/pi-train',
        noDocs: true
      },
      {
        name: '换座位-pc',
        path: 'https://cqlql.github.io/demos/seating-pc/',
        env: 'pc',
        noDocs: true
      }
    ]
  }
  // {
  //   name: 'zoom-touch(触摸捏合放大)',
  //   path: '/zoom-touch',
  //   demo: () => import(/* webpackChunkName: "docs1" */ '@/modules/zoom-touch/demo.vue'),
  //   docs: () => import(/* webpackChunkName: "docs1" */ '@/modules/zoom-touch/README.md'),
  // },
  // {
  //   name: 'image-crop(裁图)',
  //   path: '/image-crop',
  //   demo: () => import(/* webpackChunkName: "docs1" */ '@/components/image-crop/Demo.vue'),
  // },
  // {
  //   name: 'v-transition (常用 vue transition 动画)',
  //   path: '/v-transition',
  //   demo: () => import(/* webpackChunkName: "docs1" */ '@/components/v-transition/demo.vue'),
  //   docs: () => import(/* webpackChunkName: "docs1" */ '@/components/v-transition/README.md'),
  // }
]