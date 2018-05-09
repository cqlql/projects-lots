/* eslint-disable */
import Vue from 'vue'
import Random1 from './modules/random/demo1'
// import ChineseOne from './pages/ChineseOne.vue'
// import click from './modules/corejs/dom/click.vue.js'

// Vue.use(click)

switch (location.pathname.match(/[^/]+$/)[0]) {
  case 'chineseRead.html':
    import(/* webpackChunkName: "pages" */ './pages/ChineseRead.js')
    break
  case 'mathCount.html':
    import(/* webpackChunkName: "pages" */ './pages/MathCount.js')
    break
  case 'englishNew.html':
  import(/* webpackChunkName: "pages" */ './pages/EnglishNew.js')
    break
  case 'englishSpeak.html':
    import(/* webpackChunkName: "pages" */ './pages/EnglishSpeak.js')
    break
  case 'chineseBox.html':
    import(/* webpackChunkName: "pages" */ './pages/ChineseBox.js')
  break
  case 'chineseLantern.html':
  case 'peTwo.html':
  case 'danceTwo.html':
    import(/* webpackChunkName: "pages" */ './pages/ChineseLantern.js')
  break
  case 'scienceOne1.html':
    import(/* webpackChunkName: "pages" */ './pages/ScienceOne.js').then(function ({default: f}) {
      f(6)
    })
    break
  case 'scienceOne2.html':
    import(/* webpackChunkName: "pages" */ './pages/ScienceOne.js').then(function ({default: f}) {
      f(4)
    })
    break
  case 'englishOne.html':
  case 'peBasketball.html':
    import(/* webpackChunkName: "pages" */ './pages/EnglishOne.js')
    break
}
