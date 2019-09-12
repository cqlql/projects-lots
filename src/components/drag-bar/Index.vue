<template>
  <div :class="$style.bar"></div>
</template>

<script>
import drag from '@/modules/corejs/drag/drag-plus.js'
export default {
  props: {
    size: Number,
    min: {
      type: Number,
      default: 0
    },
    max: Number
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
      },
      onMove: ({ lx }) => {
        const { min, max } = this
        len += lx
        let size = len + start
        if (max && size > max) size = max
        if (size < min) size = min

        this.$emit('change', size - start)
        this.$emit('update:size', size)
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
