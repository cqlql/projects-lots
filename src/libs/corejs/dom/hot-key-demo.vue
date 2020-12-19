<template>
  <div :class="$style.demo">
    <div v-key-ctrl="onCtrl">
      <h2>ctrl+</h2>
      <input type="text">
      <p>ctrl + {{keyLetter1}}</p>
      <p> keyCode:{{keyCode1||'?'}}</p>
    </div>
    <div v-key-ctrl-shift="onCtrlShift">
      <h2>ctrl+shift+</h2>
      <input type="text">
      <p>ctrl + shift + {{keyLetter2}}</p>
      <p>keyCode:{{keyCode2||'?'}}</p>
    </div>
  </div>
</template>

<script>
import { keyCtrl, keyCtrlShift } from './hot-key.js'
export default {
  data () {
    return {
      keyCode1: '',
      keyCode2: ''
    }
  },
  computed: {
    keyLetter1 () {
      let {keyCode1} = this
      return keyCode1 && String.fromCharCode(keyCode1)
    },
    keyLetter2 () {
      let {keyCode2} = this
      return keyCode2 && String.fromCharCode(keyCode2)
    }
  },
  directives: {
    'key-ctrl': {
      // 指令的定义
      inserted (el, { value }) {
        keyCtrl(el, value)
      }
    },
    'key-ctrl-shift': {
      // 指令的定义
      inserted (el, { value }) {
        keyCtrlShift(el, value)
      }
    }
  },
  methods: {
    onCtrl (keyCode) {
      console.log(keyCode)
      this.keyCode1 = keyCode
      return true // 通过返回 true 阻止默认快捷键
    },
    onCtrlShift (keyCode) {
      console.log(keyCode)
      this.keyCode2 = keyCode
      return true // 通过返回 true 阻止默认快捷键
    }
  }
}
</script>

<style module>
.demo {
  padding: 10px;
}
</style>

