import DragZoom from '@/utils/zoom-touch/drag-zoom'
import autoPrefix from '@/utils//corejs/css/autoprefix'
import elPageXy from '@/utils/corejs/xy/el-page-xy.js'
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

    // elem.style[autoPrefix('transform-origin')] = '0 0'

    // 是否初始更新，更新位置尺寸
    if (isInit) {
      this.update()
    }
  }

  // 松开情况，只要还有手指在，就会触发
  onStart (pageX, pageY) {
    const x = this.prex = this.x
    const y = this.prey = this.y
    this.preScale = this.scale
    this.startx = pageX
    this.starty = pageY

    const { elClientRect, scale } = this
    this.transformOriginX = (pageX - elClientRect.left - x) / (elClientRect.width * scale)
    this.transformOriginY = (pageY - elClientRect.top - y) / (elClientRect.height * scale)
  }

  onMove (pageX, pageY, scale) {
    const { preScale, elClientRect } = this

    this.scale = scale * preScale

    // 放大后偏移的 xy
    const toScale = (scale - 1) * preScale
    const sx = elClientRect.width * toScale * this.transformOriginX
    const sy = elClientRect.height * toScale * this.transformOriginY

    this.x = this.prex + pageX - this.startx - sx
    this.y = this.prey + pageY - this.starty - sy
    this.css()
  }

  update () {
    // 注意：getBoundingClientRect 不会忽略 transform，而这里需要得到元素忽略 transform 的原始高宽坐标，待改正
    // this.elClientRect = this.elem.getBoundingClientRect()

    // 改正后
    const { elClientRect, elem } = this
    const { x, y } = elPageXy(elem)
    elClientRect.left = x
    elClientRect.top = y
    elClientRect.width = elem.offsetWidth
    elClientRect.height = elem.offsetHeight
  }

  css () {
    this.elem.style[this.transform] = `translate(${this.x}px,${this.y}px) scale(${this.scale})`
  }
}
