<template>
  <div class="dv-box" :style="{width:width+'px'}">
    <slot />
    <div ref="eBar" class="dv-bar"/>
  </div>
</template>

<script>
import drag from '@/utils/corejs/drag/drag-plus.js'
export default {
  // model: {
  //   prop: 'width',
  //   event: 'resize'
  // },
  props: {
    s: {
      type: Object,
      default () { return {} }
    },
    width: {
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
  // data () {
  //   return {
  //     width: this.initialWidth
  //   }
  // },
  created () {
    this.x = this.width
  },
  mounted () {
    let len = 0
    let tw
    const elem = this.$refs.eBar
    // 双击最小/恢复
    elem.ondblclick = () => {
      const { width, minWidth } = this
      let w
      if (width > minWidth) {
        w = minWidth
        this.prevWidth = width
      } else {
        w = this.prevWidth
      }
      this.$emit('update:width', w)
      this.$emit('resize', w)
    }
    drag({
      elem,
      onStart: e => {
        len = 0
        tw = this.width
        e.preventDefault()
        this.$emit('start')
      },
      onMove: ({ lx }) => {
        len += lx
        let width = tw + len
        const { maxWidth, minWidth } = this
        if (width < minWidth) {
          width = minWidth
        } else if (width > maxWidth) {
          width = maxWidth
        }
        width = width || maxWidth
        this.$emit('update:width', width)
        this.$emit('resize', width)
      },
      onEnd: () => {
        this.$emit('end')
      }
    })
  }
}
</script>

<style scoped>
.dv-box {
  position: relative;
}
.dv-bar {
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 100%;
  transform: translateX(60%);
  cursor: e-resize;
}
</style>
