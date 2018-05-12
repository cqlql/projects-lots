import Demo from '@/modules/switch-one/demo.vue'
import Demo2 from '@/modules/switch-one/demo2.vue'

export default [
  {
    path: '/switch-one',
    name: 'switch-one',
    meta: {title: '窗口切换'},
    component: Demo
  },
  {
    path: '/switch-one2',
    name: 'switch-one2',
    meta: {title: '窗口切换2'},
    component: Demo2
  }
]
