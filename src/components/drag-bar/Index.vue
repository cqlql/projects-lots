<template>
  <div :class="$style.bar"></div>
</template>

<script>
import drag from '@/libs/corejs/drag/drag-plus.js'
export default {
  props: {
    size: Number,
    min: {
      type: Number,
      default: 0
    },
    max: Number,
    change: Function // 定制 change
  },
  mounted () {
    let len
    let start
    drag({
      elem: this.$el,
      onStart: e => {
        len = 0
        start = this.size
        e.preventDefault()
        this.$emit('start')
      },
      onMove: ({ lx }) => {
        len += lx
        if (this.change) {
          this.change({ len, start })
          return
        }
        const { min, max } = this
        let size = len + start
        if (max && size > max) size = max
        if (size < min) size = min

        this.$emit('change', { size, start, len })
        this.$emit('update:size', size)
      },
      onEnd: () => {
        this.$emit('end')
      }
    })
  }
}
</script>

<style module>
.bar {
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 100%;
  transform: translateX(50%);
  cursor: e-resize;
}
</style>
