import Vue from 'vue'
import MsgComponent from './index.vue'

const Msg = Vue.extend(MsgComponent)
const dMsg = new Msg().$mount()
document.body.appendChild(dMsg.$el)

window.dmsg = function () {
  dMsg.show(...arguments)
}

window.dmsg.hide = function () {
  dMsg.hide()
}
