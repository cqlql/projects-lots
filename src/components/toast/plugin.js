import ToastComponent from './index.vue'

export default {
  install: function (Vue, options) {
    const Toast = Vue.extend(ToastComponent)
    const toast = new Toast().$mount()
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = function (msg) {
      toast.show(msg)
    }
  }
}
