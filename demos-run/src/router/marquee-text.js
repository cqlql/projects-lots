import Demo from '@/modules/marquee-text/Demo.vue'
import DemoAcross from '@/modules/marquee-text/DemoAcross.vue'
import Demo2 from '@/modules/marquee-text/Demo.1'
export default [
  {
    path: '/marquee-text',
    name: 'marquee-text',
    meta: {title: '文本滚动/文本跑马灯'},
    component: Demo
  },
  {
    path: '/marquee-text-across',
    name: 'marquee-text-across',
    meta: {title: '文本滚动/文本跑马灯 - 横板'},
    component: DemoAcross
  },
  {
    path: '/marquee-text2',
    name: 'marquee-text2',
    meta: {title: '文本滚动/文本跑马灯-旧版'},
    component: Demo2
  }
]
