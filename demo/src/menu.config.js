
export default [
  {
    name: 'UI组件',
    children: [
      {
        name: 'toast(简易的消息提示框)',
        path: '/toast',
        demo: import(/* webpackChunkName: "toast" */ '@/components/toast/demo.vue'),
        docs: import(/* webpackChunkName: "toast" */ '@/components/toast/README.md')
      }
    ],
  }
]
