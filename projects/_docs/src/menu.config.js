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
        // path: '/my-note',
        // docs: () => import(/* webpackChunkName: "docs1" */ './docs/my-note.md'),
        path: 'https://cqlql.gitee.io/note/',
        noDocs: true,
        env: 'pc'
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
        name: '移动端 banner',
        path: '/mobile-banner2',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/mobile-banner2/demo/index.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/mobile-banner2/README.md')
      },
      {
        name: '文本跑马灯',
        path: '/marquee-text',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/marquee-text/demo/Index.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/marquee-text/README.md')
      },
      {
        name: 'loading',
        path: '/loading',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/loading/Demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/loading/README.md')
      },
      {
        name: '滑动选择',
        path: '/slide-select',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/slide-select/demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/slide-select/README.md')
      },
      {
        name: '滑动选择-日期',
        path: '/slide-select-date',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/slide-select-date/demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/slide-select-date/README.md')
      },
      {
        name: '确认框',
        path: '/confirm',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/confirm/demo.vue')
      },
      {
        name: '弹窗',
        path: '/popup',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/popup/demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/popup/README.md')
      },
      {
        name: '截图',
        path: '/image-crop',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/image-crop/Demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/image-crop/README.md')
      },
      {
        name: '常用 vue transition 动画',
        path: '/v-transition',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/components/v-transition/demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/components/v-transition/README.md'),
      },
      // {
      //   name: '滑动唯一加载',
      //   path: '/slider-one-load',
      //   demo: () => import(/* webpackChunkName: "docs1" */ '@/components/slider-one-load/Demo.vue'),
      //   docs: () => import(/* webpackChunkName: "docs1" */ '@/components/slider-one-load/README.md')
      // },
      // {
      //   name: '切换效果-多元素',
      //   path: '/switch-multi',
      //   demo: () => import(/* webpackChunkName: "docs1" */ '@/modules/switch-multi/demo.vue'),
      //   noDocs: true,
      //   env: 'pc'
      //   // docs: () => import(/* webpackChunkName: "docs1" */ '@/modules/switch-multi/README.md')
      // },
      // {
      //   name: '切换效果-单元素',
      //   path: '/switch-one',
      //   demo: () => import(/* webpackChunkName: "docs1" */ '@/modules/switch-one/demo.vue'),
      //   noDocs: true,
      //   env: 'pc'
      //   // docs: () => import(/* webpackChunkName: "docs1" */ '@/modules/switch-multi/README.md')
      // },
      // {
      //   name: '',
      //   path: '',
      //   demo: () => import(/* webpackChunkName: "docs1" */ '@/components/zoom-touch/demo.vue'),
      //   docs: () => import(/* webpackChunkName: "docs1" */ '@/components/zoom-touch/README.md')
      // },
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
    name: 'js 原生模块',
    children: [
      {
        name: '双指捏合放大',
        path: '/zoom-touch',
        demo: () => import(/* webpackChunkName: "docs1" */ '@/modules/zoom-touch/demo.vue'),
        docs: () => import(/* webpackChunkName: "docs1" */ '@/modules/zoom-touch/README.md')
      }
      // {
      //   name: '轻提醒-js版',
      //   path: '/toast-js',
      //   // demo: () => import(/* webpackChunkName: "docs1" */ '@/modules/zoom-touch/demo.vue'),
      //   docs: () => import(/* webpackChunkName: "docs1" */ '@/modules/toast-js/README.md')
      // }
    ]
  },
  {
    name: '其他',
    children: [
      {
        name: '页面可视化编辑',
        path: 'https://cqlql.github.io/demos/visual-edit',
        noDocs: true,
        env: 'pc'
      },
      {
        name: '圆周率记忆练习',
        path: 'https://cqlql.gitee.io/pi-train',
        noDocs: true
      },

      {
        name: '英语单词挑战',
        path: 'https://cqlql.github.io/demos/english-words-challenge/',
        env: 'pc',
        noDocs: true
      },
      
      {
        name: '20151013_自定义滚动条',
        path: 'https://cqlql.github.io/demo/20151013_%E8%87%AA%E5%AE%9A%E4%B9%89%E6%BB%9A%E5%8A%A8%E6%9D%A1_%E6%BB%9A%E5%8A%A8%E5%B1%95%E7%A4%BA%E5%8A%9F%E8%83%BD/',
        env: 'pc',
        noDocs: true
      },
      {
        name: '图片幻灯_鱼眼放大',
        path: 'https://cqlql.github.io/demo/20141111_JQ_%E5%9B%BE%E7%89%87%E5%B9%BB%E7%81%AF/',
        env: 'pc',
        noDocs: true
      },
      {
        name: '图片展示360度+缩放',
        path: 'https://cqlql.github.io/demo/20141111_JQ_%E5%9B%BE%E7%89%87%E5%B1%95%E7%A4%BA360%E5%BA%A6/',
        env: 'pc',
        noDocs: true
      },
      {
        name: '图片展示Metro风格',
        path: 'https://cqlql.github.io/demo/20141111_JQ_%E5%9B%BE%E7%89%87%E5%B1%95%E7%A4%BAMetro%E9%A3%8E%E6%A0%BC/',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20120725_仿京东商品放大查看',
        path: 'https://cqlql.github.io/demo/20120725_%E4%BB%BF%E4%BA%AC%E4%B8%9C%E5%95%86%E5%93%81%E6%94%BE%E5%A4%A7%E6%9F%A5%E7%9C%8B',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20120905_日历',
        path: 'https://cqlql.github.io/demo/20120905_%E6%97%A5%E5%8E%86/index.html',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20130101_标签跟随淡出',
        path: 'https://cqlql.github.io/demo/20130101_%E6%A0%87%E7%AD%BE%E8%B7%9F%E9%9A%8F%E6%B7%A1%E5%87%BA',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20140000_层级树',
        path: 'https://cqlql.github.io/demo/20141111_JQ_%E6%97%A0%E9%99%90%E5%B1%82%E7%BA%A7%E6%A0%91/',
        env: 'pc',noDocs: true
      },
      {
        name: '20141015_自定义下拉框_带搜索_支持快捷键',
        path: 'https://cqlql.github.io/demo/20141015_%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%8B%E6%8B%89%E6%A1%86_%E5%B8%A6%E6%90%9C%E7%B4%A2_%E6%94%AF%E6%8C%81%E5%BF%AB%E6%8D%B7%E9%94%AE/',
        env: 'pc',noDocs: true
      },
      {
        name: '20160426_省级联动',
        path: 'https://cqlql.github.io/demo/20160426_%E7%9C%81%E7%BA%A7%E8%81%94%E5%8A%A8/',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20160801_换座位',
        path: 'https://cqlql.github.io/demos/seating-pc/',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20160803_满屏轮播',
        path: 'https://cqlql.github.io/demo/20160803_%E6%BB%A1%E5%B1%8F%E8%BD%AE%E6%92%AD/',
        env: 'pc',
        noDocs: true
      },
      
      {
        name: '20160804_移动端_题目截图',
        path: 'https://cqlql.github.io/demo/20160804_%E7%A7%BB%E5%8A%A8%E7%AB%AF_%E9%A2%98%E7%9B%AE%E6%88%AA%E5%9B%BE/dist/',
        noDocs: true
      },
      {
        name: '20160827_跟随式弹框',
        path: 'https://cqlql.github.io/demo/20160827_%E8%B7%9F%E9%9A%8F%E5%BC%8F%E5%BC%B9%E6%A1%86/',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20160830_简单放大镜效果',
        path: 'https://cqlql.github.io/demo/20160830_%E7%AE%80%E5%8D%95%E6%94%BE%E5%A4%A7%E9%95%9C%E6%95%88%E6%9E%9C/',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20161122_层叠式图片轮换css3实现',
        path: 'https://cqlql.github.io/demo/20161122_%E5%B1%82%E5%8F%A0%E5%BC%8F%E5%9B%BE%E7%89%87%E8%BD%AE%E6%8D%A2css3%E5%AE%9E%E7%8E%B0/view',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20161207_文字滚动-animation实现',
        path: 'https://cqlql.github.io/demo/20161207_%E6%96%87%E5%AD%97%E8%B7%91%E9%A9%AC%E7%81%AF/',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20161230_数字随机滚动_抽奖',
        path: 'https://cqlql.github.io/demo/20161230_%E6%95%B0%E5%AD%97%E4%B8%8A%E4%B8%8B%E5%BE%AA%E7%8E%AF%E6%BB%9A%E5%8A%A8_%E6%8A%BD%E5%A5%96/index1',
        env: 'pc',
        noDocs: true
      },
      {
        name: '20170317_转盘抽奖',
        path: 'https://cqlql.github.io/demo/20170317_happywheel/dist/happywheel.html',
        noDocs: true
      },
      {
        name: '20170322_拖动换位',
        path: 'https://cqlql.github.io/demo/20170322_%E6%8B%96%E5%8A%A8%E6%8D%A2%E4%BD%8D/dist/',
        env: 'pc',
        noDocs: true
      },
      // {
      //   name: '20170407_移动端_仿微信截图',
      //   path: 'https://cqlql.github.io/demo/20170407_%E7%A7%BB%E5%8A%A8%E7%AB%AF_%E4%BB%BF%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE/dist/',
      //   noDocs: true
      // },
      // {
      //   name: '20170428_翻页模块封装',
      //   path: 'https://cqlql.github.io/demo/20170428_paginator/dist/',
      //   env: 'pc',
      //   noDocs: true
      // },
      {
        name: '20170527_定制评课富文本',
        path: 'https://cqlql.github.io/demo/20170527_%E8%AF%84%E8%AF%BE%E4%B8%93%E7%94%A8%E5%AF%8C%E6%96%87%E6%9C%AC/dist/',
        noDocs: true
      },
      {
        name: '20170816_定制饼图统计-svg实现',
        path: 'https://cqlql.github.io/demo/20170816_%E5%88%86%E5%9D%97%E9%A5%BC%E5%9B%BE%E7%BB%9F%E8%AE%A1/dist/',
        noDocs: true
      }
      // {
      //   name: 'xxx',
      //   path: 'xxx',
      //   env: 'pc',
      //   noDocs: true
      // }
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