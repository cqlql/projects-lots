import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'
import Play from '@/components/Play.vue'
import PlayPractice from '@/components/PlayPractice.vue'
import PlaySimple from '@/components/PlaySimple2.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    alias: ['/'],
    name: 'Home',
    meta: {title: 'Home'},
    component: Home
  }, {
    path: '/practice',
    name: 'Practice',
    meta: {title: '练习'},
    // props: true,
    component: PlayPractice
  }, {
    path: '/challenge',
    name: 'Challenge',
    meta: {title: '挑战'},
    // props: true,
    component: Play
  }, {
    path: '/challenge-simple',
    name: 'ChallengeSimple',
    meta: {title: '挑战'},
    // props: true,
    component: PlaySimple
  }]
})
