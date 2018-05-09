import Vue from 'vue'
import Router from 'vue-router'

// 批量导入路由，目前未使用此方案
// let routes = []
// function importAll (r) {
//   r.keys().forEach(key => {
//     routes.push(r(key).default)
//   })
// }
// importAll(require.context('./', false, /\/(?!index).+\.js$/))
// export default new Router({ routes })

// import Login from '../components/Login.vue'
import Home from '@/components/Home.vue'
import Check from '@/components/Check/Check.vue'
// const Check = () => import(/* webpackChunkName: "Check" */ '@/components/Check/Check.vue')

const Leave = () => import(/* webpackChunkName: "Leave" */ '@/components/Leave/Leave.vue')
const Today = () => import(/* webpackChunkName: "Leave" */ '@/components/Leave/Today.vue')
const Statistics = () => import(/* webpackChunkName: "Leave" */ '@/components/Leave/Statistics.vue')
const Compare = () => import(/* webpackChunkName: "Leave" */ '@/components/Leave/Compare.vue')
const MyClass = () => import(/* webpackChunkName: "Leave" */ '@/components/Leave/MyClass.vue')
const LeaveDet = () => import(/* webpackChunkName: "Leave" */ '@/components/Leave/LeaveDet.vue')

const Literacy = () => import(/* webpackChunkName: "Literacy" */ '@/components/Literacy/Literacy.vue')
const LiteracyStat = () => import(/* webpackChunkName: "Literacy" */ '@/components/Literacy/LiteracyStat.vue')
const Volunt = () => import(/* webpackChunkName: "Literacy" */ '@/components/Literacy/Volunt.vue')
const Co = () => import(/* webpackChunkName: "Literacy" */ '@/components/Literacy/Co.vue')
const ClassCircle = () => import(/* webpackChunkName: "Literacy" */ '@/components/Literacy/ClassCircle.vue')
const Track = () => import(/* webpackChunkName: "Literacy" */ '@/components/Literacy/Track.vue')
const Record = () => import(/* webpackChunkName: "Literacy" */ '@/components/Record.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      alias: '/',
      name: 'Home',
      meta: {title: 'Home'},
      component: Home
    },
    {
      path: '/home/leave',
      name: 'Leave',
      component: Leave,
      children: [
        {
          path: 'today',
          alias: '',
          name: 'Today',
          meta: {title: '今天'},
          component: Today
        },
        {
          path: 'stat',
          name: 'Statistics',
          meta: {title: '统计'},
          component: Statistics
        }
      ]
    },
    {
      path: '/home/leave/stat/myclass',
      name: 'MyClass',
      meta: {title: '我的班级'},
      component: MyClass
    },
    {
      path: '/home/leave/stat/Compare',
      name: 'Compare',
      meta: {title: '请假比较'},
      component: Compare
    },
    {
      path: '/home/leave/stu/det',
      name: 'LeaveDet',
      meta: {title: '请假详情'},
      component: LeaveDet
    },
    {
      path: '/home/literacy',
      name: 'Literacy',
      meta: {title: '素养评价'},
      component: Literacy
    },
    {
      path: '/home/literacy/stat',
      name: 'LiteracyStat',
      meta: {title: '素养数据'},
      component: LiteracyStat
    },
    {
      path: '/home/literacy/volunt',
      name: 'Volunt',
      meta: {title: '义工数据'},
      component: Volunt
    },
    {
      path: '/home/literacy/track',
      name: 'Track',
      meta: {title: '学生足迹'},
      component: Track
    },
    {
      path: '/home/literacy/classcircle',
      name: 'ClassCircle',
      meta: {title: '班级圈'},
      component: ClassCircle
    },
    {
      path: '/home/literacy/record',
      name: 'Record',
      meta: {title: '学生档案'},
      component: Record
    },
    {
      path: '/home/literacy/co',
      name: 'Co',
      meta: {title: '体质数据'},
      component: Co
    },
    {
      path: '/home/Check',
      name: 'Check',
      meta: {title: '进校考勤'},
      component: Check
    }
  ]
})
