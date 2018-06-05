<template>
  <div :class="[$style.leftBox,s.leftBox]" :style="{width:width+'px'}">
    <slot/>
    <div :class="[$style.bar, s.bar]" ref="eBar"></div>
  </div>
</template>

<script>
import drag from '@/modules/corejs/dom-drag/drag-plus.js'
export default {
  props: {
    s: Object,
    initialWidth: {
      type: Number,
      default: 600
    },
    maxWidht: Number,
    classBar: String
  },
  data () {
    return {
      width: 100
    }
  },
  created () {
    this.x = this.width = this.initialWidth
  },
  mounted () {
    let len = 0
    let tw
    drag({
      elem: this.$refs.eBar,
      onStart: e => {
        len = 0
        tw = this.width
        e.preventDefault()
      },
      onMove: ({lx}) => {
        len += lx
        let width = tw + len
        let {maxWidht} = this
        if (width < 20) {
          width = 20
        } else if (width > maxWidht) {
          width = maxWidht
        }
        this.width = width
        this.$emit('move', width)
      }
    })
  }
}
</script>

<style module>
.leftBox {
  position: relative;
  z-index: 1;
}
.bar {
  position: absolute;
  right: -10px;
  top: 0;
  width: 20px;
  height: 100%;
  cursor: e-resize;
}
</style>
