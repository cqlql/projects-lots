import ConfirmComponent from './index.vue'

export default {
  install: function (Vue) {
    const Confirm = Vue.extend(ConfirmComponent)
    const confirm = new Confirm().$mount()
    document.body.appendChild(confirm.$el)
    Vue.confirm = Vue.prototype.$confirm = function (options) {
      confirm.show(options)
    }
  }
}
