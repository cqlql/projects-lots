<template>
  <div :class="$style.marqueeTextDownBox">
    <div :class="$style.move">
      <div :class="$style.cont" :style="{'padding-right': paddingRight + 'px'}">
        <template v-if="text">{{text}}</template>
        <slot v-else/>
      </div>
      <div v-if="autoRoll" :class="$style.cont" :style="{'padding-right': paddingRight + 'px'}" v-html="$refs.vCont.innerHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    paddingRight: {
      type: [String, Number],
      default: 30
    },
    moveLenght: {
      type: [String, Number],
      default: 2
    },
    delayTime: {
      type: [String, Number],
      default: 100
    }
  },
  data () {
    return {
      contWidth: 0,
      // 是否开启自动滚动
      autoRoll: false
    }
  },
  mounted () {
    this.updateWidth()
  },
  destroyed () {
    this.stop()
  },
  methods: {
    updateWidth () {
      const { $el } = this
      const eMove = $el.children[0]
      eMove.style.width = 'auto'
      const contWidth = this.contWidth = eMove.clientWidth
      const autoRoll = this.autoRoll = $el.clientWidth < contWidth
      if (autoRoll) { eMove.style.width = contWidth * 3 + 'px' }
    },
    stop () {
      this.isRun = false
      clearInterval(this.stopId)
    },
    start () {
      if (this.isRun || this.autoRoll === false) return
      this.isRun = true
      const { $el, moveLenght } = this
      let x = this.x || 0
      this.stopId = setInterval(() => {
        x += moveLenght
        $el.scrollLeft = x
        let { contWidth } = this
        if (x > contWidth) {
          x = x - contWidth
        }
        this.x = x
      }, this.delayTime)
    },
    change () {
      this.autoRoll = false
      this.$nextTick(() => this.updateWidth())
    },
    speedChange () {
      if (this.autoRoll) {
        this.stop()
        this.start()
      }
    }
  },
  watch: {
    text: 'change',
    paddingRight: 'change',
    moveLenght: 'speedChange',
    delayTime: 'speedChange',
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
  overflow: hidden;
  white-space: nowrap;
}
.move {
  float: left;
}
.cont {
  float: left;
}
</style>
