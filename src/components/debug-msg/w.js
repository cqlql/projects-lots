import Vue from 'vue'
import MsgComponent from './index.vue'

const Msg = Vue.extend(MsgComponent)
const dMsg = new Msg().$mount()
document.body.appendChild(dMsg.$el)

window.dlog = function () {
  dMsg.show(...arguments)
}

window.dlog.hide = function () {
  dMsg.hide()
}
