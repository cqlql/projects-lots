import ToastComponent from './index.vue'

export default {
  install: function (Vue) {
    const Toast = Vue.extend(ToastComponent)
    const toast = new Toast().$mount()
    document.body.appendChild(toast.$el)

    let $toast = Vue.toast = Vue.prototype.$toast = toast.text
    $toast.error = toast.error
    $toast.success = toast.success
  }
}
