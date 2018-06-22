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
    s: {
      type: Object,
      default () { return {} }
    },
    initialWidth: {
      type: Number,
      default: 210
    },
    minWidth: {
      type: Number,
      default: 20
    },
    maxWidth: {
      type: Number,
      default: 600
    },
    classBar: String
  },
  data () {
    return {
      width: this.initialWidth
    }
  },
  created () {
    this.x = this.width
  },
  mounted () {
    let len = 0
    let tw
    let elem = this.$refs.eBar
    elem.ondblclick = () => {
      this.$emit('resize', (this.width = this.minWidth))
    }
    drag({
      elem,
      onStart: e => {
        len = 0
        tw = this.width
        e.preventDefault()
      },
      onMove: ({lx}) => {
        len += lx
        let width = tw + len
        let {maxWidth, minWidth} = this
        if (width < minWidth) {
          width = minWidth
        } else if (width > maxWidth) {
          width = maxWidth
        }
        this.width = width
        this.$emit('resize', width)
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
  right: -2px;
  top: 0;
  width: 10px;
  height: 100%;
  cursor: e-resize;
}
</style>
