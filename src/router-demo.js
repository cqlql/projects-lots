/* eslint-disable comma-dangle */

export default [
  {
    path: '/demo',
    component: require('../../module-test/demo.vue').default
  },
  // {
  //   path: '/buttons',
  //   component: require('@/components/morality-manager/@jony/comm/buttons/demo.vue').default
  // },
  // {
  //   path: '/slide-select2',
  //   component: require('@/modules/slide-select2/Demo.vue').default
  // },
  // {
  //   path: '/face-collect/slide-select2-top',
  //   component: require('@/components/face-collect/slide-select2-top/Demo.vue').default
  // },
  // {
  //   path: '/loader-refresh',
  //   meta: { title: '下拉刷新-到底加载-无数据情况 demo' },
  //   component: require('@/modules/loader-refresh/demo2.NoData.vue').default
  // },
  // {
  //   path: '/refresh-top',
  //   meta: { title: '下拉刷新-无数据情况 demo' },
  //   component: require('@/modules/refresh-top/Demo.NoData.vue').default
  // },
  {
    path: '/loader-bottom-page',
    meta: { title: 'demo - 到底加载-集成翻页' },
    component: require('@/modules/loader-bottom/Demo.page.vue').default
  },
  {
    path: '/image-crop',
    meta: { title: 'demo - 弹窗截图' },
    component: require('@/modules/image-crop/demo.vue').default
  },
  {
    path: '/file-upload-qiniu',
    meta: { title: 'demo - 七牛文件上传' },
    component: require('@/js/file-upload-qiniu.demo.vue').default
  },
  {
    path: '/file-select',
    meta: { title: 'demo - 文件选择-拍照、录像、录音、文件选择' },
    component: require('@/modules/corejs/dom/file-select.demo.vue').default
  },
]
