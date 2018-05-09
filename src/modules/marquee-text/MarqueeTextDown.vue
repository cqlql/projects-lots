<template>
  <div :class="$style.marqueeTextDownBox">
    <div :class="$style.move">
      <div :class="$style.cont">
        {{text}}
      </div>
      <div v-if="autoRoll" :class="$style.cont">
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  data () {
    return {
      contHeight: 0,
      // 是否开启自动滚动
      autoRoll: false
    }
  },
  mounted () {
    this.updateHeight()
  },
  destroyed () {
    this.stop()
  },
  methods: {
    updateHeight () {
      const { $el } = this
      const eMove = $el.children[0]
      const contHeight = this.contHeight = eMove.clientHeight
      this.autoRoll = $el.clientHeight < contHeight
    },
    stop () {
      clearInterval(this.stopId)
    },
    start () {
      const { $el } = this
      let y = 0
      this.stopId = setInterval(() => {
        y += 1
        $el.scrollTop = y
        let { contHeight } = this
        if (y > contHeight) {
          y = y - contHeight
        }
      }, 100)
    }
  },
  watch: {
    text () {
      this.autoRoll = false
      this.$nextTick(() => this.updateHeight())
    },
    autoRoll (autoRoll) {
      if (autoRoll) {
        this.start()
      } else {
        this.stop()
      }
    }
  }
}
</script>

<style module>
.marqueeTextDownBox {
  width: 300px;
  overflow: hidden;
}
.move {
}
.cont {
}
</style>
