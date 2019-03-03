import DragZoom from './drag-zoom'
import autoPrefix from '../corejs/dom-css/autoprefix'
export default class ZoomTouch extends DragZoom {
  constructor (params) {
    let { elem, isInit = true } = params
    if (!elem) elem = params
    super(elem)

    this.elem = elem
    this.elClientRect = { }
    this.transform = autoPrefix('transform')
    this.x = 0
    this.y = 0
    this.prex = 0
    this.prey = 0
    this.startx = 0
    this.starty = 0
    this.scale = 1

    if (isInit) {
      this.update()
    }
  }
  // 松开情况，只要还有手指在，就会触发
  onStart (clientX, clientY) {
    this.prex = this.x
    this.prey = this.y
    this.startx = clientX
    this.starty = clientY
  }
  onMove (clientX, clientY, scale) {
    this.x = this.prex + clientX - this.startx
    this.y = this.prey + clientY - this.starty
    this.css()
  }
  update () {
    this.elClientRect = this.elem.getBoundingClientRect()
  }
  css () {
    this.elem.style[this.transform] = `translate(${this.x}px,${this.y}px) scale(${this.scale})`
    console.log(this.elem.getBoundingClientRect())
  }
}
