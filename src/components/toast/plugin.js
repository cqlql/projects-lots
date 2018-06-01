import ToastComponent from './index.vue'

export default {
  install: function (Vue) {
    const Toast = Vue.extend(ToastComponent)
    const toast = new Toast().$mount()
    document.body.appendChild(toast.$el)

    Vue.toast = Vue.prototype.$toast = function (msg) {
      toast.show(msg)
    }
  }
}
