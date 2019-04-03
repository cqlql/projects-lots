/* eslint-disable comma-dangle */
import Vue from 'vue'
import Router from 'vue-router'
import menu from '../menu.config.js'
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: require('./components/Docs.vue').default
  }
]

function addRoute (children = []) {
  children.forEach(item => {
    let { children, name, path, demo } = item
    if (children) addRoute(children)
    if (path) {
      routes.push({
        path,
        title: name,
        component: demo
      })
    }
  })
}
addRoute(menu)

export default new Router({
  routes: routes
})
