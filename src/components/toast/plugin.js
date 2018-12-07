import ToastComponent from './index.vue'

export default {
  install: function (Vue, { position = 'bottom', successPosition = 'center', errorPosition = 'center' } = {}) {
    const Toast = Vue.extend(ToastComponent)
    const toast = new Toast().$mount()
    document.body.appendChild(toast.$el)

    let $toast = Vue.prototype.$toast = toast.text
    $toast.show = toast.show
    $toast.error = toast.error
    $toast.success = toast.success

    toast.position = position
    toast.successPosition = successPosition
    toast.errorPosition = errorPosition
  }
}
