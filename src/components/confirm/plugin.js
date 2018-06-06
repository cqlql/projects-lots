import ConfirmComponent from './index.vue'

export default {
  install: function (Vue) {
    const Confirm = Vue.extend(ConfirmComponent)
    const confirm = new Confirm().$mount()
    document.body.appendChild(confirm.$el)
    const $confirm = Vue.confirm = Vue.prototype.$confirm = function (description, onConfirm, onCancel) {
      confirm.short(description, onConfirm, onCancel)
    }
    $confirm.show = confirm.show
  }
}
