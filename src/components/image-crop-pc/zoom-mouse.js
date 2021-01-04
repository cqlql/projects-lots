import drag from '@/utils/corejs/drag/drag-pc.js'
import mouseWheel from '@/utils/corejs/dom/mouse-wheel'
import elPageXY from '@/utils/corejs/xy/el-page-xy'
import ExcuDelay from '@/utils/corejs/excu/excu-delay'

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
    this.updateBoxWH()
    const elem = this.elem
    let sx // 起始
    let sy
    let px // 上一次
    let py
    let preScale
    // const whr = this.w / this.h
    const zoomScale = 0.1 // 每次缩放要加减的值
    // const zoomWidthVal = 50
    var excuDelay = new ExcuDelay()
    this.unbindMouseWheel = mouseWheel(elem, ({ deltaY, pageX, pageY }) => {
      this.updateBoxXY()
      const { x, y, scale, elClientRect } = this

      preScale = scale

      this.transformOriginX = (pageX - elClientRect.left - x) / (elClientRect.width * scale)
      this.transformOriginY = (pageY - elClientRect.top - y) / (elClientRect.height * scale)
      let zoomScaleVal
      if (deltaY < 0) {
        // 放大
        zoomScaleVal = zoomScale
      } else {
        // 缩小
        zoomScaleVal = -zoomScale
      }
      this.scale = this.scale * (1 + zoomScaleVal)

      // 放大后偏移的 xy
      const toScale = zoomScaleVal * preScale
      const sx = elClientRect.width * toScale * this.transformOriginX
      const sy = elClientRect.height * toScale * this.transformOriginY

      this.x = this.x - sx
      this.y = this.y - sy
      this.css()
      excuDelay.excu(() => this.onEnd(), 100)
    })
    this.unbindDrag = drag({
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

  unbindMouseWheel () {}
  unbindDrag () {}

  updateBoxWH () {
    const { elClientRect, elem } = this
    elClientRect.width = elem.offsetWidth
    elClientRect.height = elem.offsetHeight
  }

  updateBoxXY () {
    const { elClientRect, elem } = this
    const { x, y } = elPageXY(elem)
    elClientRect.left = x
    elClientRect.top = y
  }

  // 解除可能会重复注册的事件
  destroy () {
    this.unbindMouseWheel()
    this.unbindDrag()
  }

  css () {}
  onDown () {}
  onEnd () {}
}
