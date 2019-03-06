import DragZoom from './drag-zoom'
import autoPrefix from '../corejs/dom-css/autoprefix'
/**
 * @param isInit 初始更新部分参数，更新元素位置参数
 */
export default class ZoomTouch extends DragZoom {
  constructor (params) {
    let { elem, isInit = true } = params
    if (!elem) elem = params
    super(elem)

    this.elem = elem
    this.elClientRect = { left: 0, top: 0, width: 0, height: 0 }
    this.transform = autoPrefix('transform')
    this.transformOriginX = 0
    this.transformOriginY = 0
    this.x = 0
    this.y = 0
    this.prex = 0
    this.prey = 0
    this.startx = 0
    this.starty = 0
    this.scale = 1
    this.preScale = 1

    elem.style[autoPrefix('transform-origin')] = '0 0'

    // 是否初始更新，
    if (isInit) {
      this.update()
    }
  }
  // 松开情况，只要还有手指在，就会触发
  onStart (clientX, clientY) {
    let x = this.prex = this.x
    let y = this.prey = this.y
    this.preScale = this.scale
    this.startx = clientX
    this.starty = clientY

    let { elClientRect, scale } = this
    this.transformOriginX = (clientX - elClientRect.left - x) / (elClientRect.width * scale)
    this.transformOriginY = (clientY - elClientRect.top - y) / (elClientRect.height * scale)
  }
  onMove (clientX, clientY, scale) {
    let { preScale, elClientRect } = this

    this.scale = scale * preScale

    // 放大后偏移的 xy
    let toScale = (scale - 1) * preScale
    let sx = elClientRect.width * toScale * this.transformOriginX
    let sy = elClientRect.height * toScale * this.transformOriginY

    this.x = this.prex + clientX - this.startx - sx
    this.y = this.prey + clientY - this.starty - sy
    this.css()
  }
  update () {
    // 注意：getBoundingClientRect 不会忽略 transform，而这里需要得到元素忽略 transform 的原始高宽坐标，待改正
    this.elClientRect = this.elem.getBoundingClientRect()
  }
  css () {
    this.elem.style[this.transform] = `translate(${this.x}px,${this.y}px) scale(${this.scale})`
  }
  transformOriginChange (ox, oy) {
    let { elClientRect, transformOriginX, transformOriginY, scale } = this
    this.x = this.x - (ox - transformOriginX) / 100 * (elClientRect.width * (scale - 1))
    this.y = this.y - (oy - transformOriginY) / 100 * (elClientRect.height * (scale - 1))
    this.transformOriginX = ox
    this.transformOriginY = oy
  }
}
