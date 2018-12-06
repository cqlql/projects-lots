<template>
  <div class="drag-size"></div>
</template>

<script>
import drag from '@/modules/corejs/dom-drag/drag-plus.js'
export default {
  props: {
    d: Object
  },
  mounted () {
    let lenX = 0
    let lenY = 0
    drag({
      elem: this.$el,
      onMove: ({ lx, ly }) => {
        lenX += lx
        lenY += ly
        this.d.w = lenX
        this.d.h = lenY
      },
      onStart: () => {
        lenX = this.d.w
        lenY = this.d.h
      },
      onDown: e => {
        e.preventDefault()
      }
    })
  }
}
</script>

<style scoped>
.drag-size {
  position: absolute;
  right: -3px;
  bottom: -2px;
  width: 22px;
  height: 22px;
  background: url(./drag-size.svg) no-repeat center center;
  cursor: se-resize;
}
</style>
