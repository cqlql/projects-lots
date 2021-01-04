import drag from '@/utils/corejs/drag/drag-pc.js'
import mouseWheel from '@/utils/corejs/dom/mouse-wheel'
import elPageXY from '@/utils/corejs/xy/el-page-xy'
export default class ZoomMouse {
  constructor ({ elem }) {
    this.elem = elem
    this.x = 0
    this.y = 0
    this.scale = 1
    this.elClientRect = { left: 0, top: 0, width: 0, height: 0 }
    this.transformOriginX = 0
    this.transformOriginY = 0
    this.init()
  }

  init () {
    this.update()
    const elem = this.elem
    console.log(elem)
    let sx // 起始
    let sy
    let px // 上一次
    let py
    let preScale
    const whr = this.w / this.h
    const zoomScale = 0.1
    const zoomWidthVal = 50
    const zoomHeightVal = zoomWidthVal / whr
    mouseWheel(elem, ({ deltaY, pageX, pageY }) => {
      let { w, h, x, y, scale, elClientRect } = this
      // const { x: elXOffset, y: elYOffset } = elPageXY(elem)
      
      // 鼠标指针位置比例
      // const rx = (pageX - elXOffset) / w
      // const ry = (pageY - elYOffset) / h
      // console.log(pageX - elXOffset, pageY - elYOffset)

      preScale = scale

      this.transformOriginX = (pageX - elClientRect.left - x) / (elClientRect.width * scale)
      this.transformOriginY = (pageY - elClientRect.top - y) / (elClientRect.height * scale)

      if (deltaY < 0) {
        // 放大
        this.scale = scale = scale * (1 + zoomScale)

        // 放大后偏移的 xy
        const toScale = (scale - 1) * preScale
        const sx = elClientRect.width * toScale * this.transformOriginX
        const sy = elClientRect.height * toScale * this.transformOriginY
        
        this.x = this.x - sx
        this.y = this.y - sy

        // w += zoomWidthVal
        // h += zoomHeightVal
        // x = x - zoomWidthVal * rx
        // y = y - zoomHeightVal * ry
        // scale = this.w / w
      } else {
        // 缩小
        this.scale = this.scale * (1 - zoomScale)
        // w -= zoomWidthVal
        // h -= zoomHeightVal
        // x += zoomWidthVal * rx
        // y += zoomHeightVal * ry
        // scale = this.w / w
      }
      // _this.x = x
      // _this.y = y
      // _this.w = w
      // _this.h = h
      // _this.scale = scale
      this.css()
    })
    drag({
      elem,
      onDown: e => this.onDown(e),
      onStart: e => {
        if (e.cancelable) e.preventDefault()
        const { pageX, pageY } = e

        sx = pageX
        sy = pageY
        px = this.x
        py = this.y
      },
      onMove: ({ pageX, pageY }) => {
        const mx = pageX - sx
        const my = pageY - sy
        this.x = px + mx
        this.y = py + my
        this.css()
      },
      onEnd: e => this.onEnd()
    })
  }

  update () {
    // 注意：getBoundingClientRect 不会忽略 transform，而这里需要得到元素忽略 transform 的原始高宽坐标，待改正
    // this.elClientRect = this.elem.getBoundingClientRect()

    // 改正后
    const { elClientRect, elem } = this
    const { x, y } = elPageXY(elem)
    elClientRect.left = x
    elClientRect.top = y
    elClientRect.width = elem.offsetWidth
    elClientRect.height = elem.offsetHeight
  }

  // 解除可能会重复注册的事件
  destroy () {}

  css () {}
  onDown () {}
  onEnd () {}
}
