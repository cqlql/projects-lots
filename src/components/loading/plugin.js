import LoadingComponent from './index.vue'

export default {
  install: function (Vue) {
    const Loading = Vue.extend(LoadingComponent)
    const loading = new Loading().$mount()
    document.body.appendChild(loading.$el)
    Vue.prototype.$loading = loading
  }
}
