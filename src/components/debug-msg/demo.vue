<template>
  <div>
    <p>
      <button @click="show">弹出</button>
      <button @click="gShow">弹出：全局调用</button>
    </p>
    <DMsg ref="vDMsg"/>
  </div>
</template>

<script>
import DMsg from './index'
import './w.js'
let count = 0
export default {
  methods: {
    show () {
      this.$refs.vDMsg.show('2222', '333', count++)
    },
    hide () {
      this.$refs.vDMsg.hide()
    },
    gShow () {
      window.dmsg('全局', count++)
    }
  },
  components: {
    DMsg
  }
}
</script>
