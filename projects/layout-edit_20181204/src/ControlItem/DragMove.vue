<template>
  <div class="drag-move"></div>
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
        this.d.x = lenX
        this.d.y = lenY
      },
      onStart: () => {
        lenX = this.d.x
        lenY = this.d.y
      },
      onDown: e => {
        e.preventDefault()
      }
    })
  }
}
</script>

<style scoped>
.drag-move {
  position: absolute;
  left: -22px;
  top: 4px;
  width: 22px;
  height: 22px;
  background: #00b0ff url(./drag-move.svg) no-repeat center center;
  background-size: 71%;
  cursor: move;
}
</style>
