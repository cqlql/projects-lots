<template>
  <div ref="eContainer" class="container">
    <div>
      <img
        ref="eImg"
        :src="url"
        :style="{
          position:'absolute',
          width: w + 'px',
          height: h + 'px',
          left: x + 'px',
          top: y + 'px',
        }"
      >
      <!-- <img
        ref="eImg"
        :src="url"
        :style="{
          transform: `translate(${x}px,${y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }"
      > -->
    </div>
  </div>
</template>

<script>
import drag from '@/utils/corejs/drag/drag-pc.js'
import mouseWheel from '@/utils/corejs/dom/mouse-wheel'
import elPageXY from '@/utils/corejs/xy/el-page-xy'

export default {
  data () {
    return {
      w: 800,
      h: 450,
      x: 0,
      y: 0,
      scale: 1,
      url: require('@/components/image-crop/1.jpg').default
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const eContainer = this.$refs.eContainer
      const el = this.$refs.eImg
      let sx
      let sy
      let px
      let py
      const whr = this.w / this.h
      // const zoomScale = .2
      const zoomWidthVal = 50
      const zoomHeightVal = zoomWidthVal / whr
      const _this = this
      mouseWheel(eContainer, function ({ deltaY, pageX, pageY }) {
        let { w, h, x, y, scale } = _this
        const { x: elXOffset, y: elYOffset } = elPageXY(el)

        // 鼠标指针位置比例
        const rx = (pageX - elXOffset) / w
        const ry = (pageY - elYOffset) / h

        if (deltaY < 0) {
        // 放大
          w += zoomWidthVal
          h += zoomHeightVal
          x = x - zoomWidthVal * rx
          y = y - zoomHeightVal * ry
          scale = _this.w / w
        } else {
        // 缩小
          w -= zoomWidthVal
          h -= zoomHeightVal
          x += zoomWidthVal * rx
          y += zoomHeightVal * ry
          scale = _this.w / w
        }
        _this.x = x
        _this.y = y
        _this.w = w
        _this.h = h
        _this.scale = scale
      })
      drag({
        elem: eContainer,
        onStart (e) {
          if (e.cancelable) e.preventDefault()
          const { pageX, pageY } = e

          sx = pageX
          sy = pageY
          px = _this.x
          py = _this.y
        },
        onMove ({ pageX, pageY }) {
          const mx = pageX - sx
          const my = pageY - sy
          _this.x = px + mx
          _this.y = py + my
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 1000px;
  height: 600px;
  border: 2px solid #ddd;
  position: relative;
  overflow: hidden;
}
</style>
