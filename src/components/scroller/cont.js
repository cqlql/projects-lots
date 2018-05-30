import Dragx from './dragx.js'
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
const transform = autoprefix('transform')
export default class {
  constructor ({elem, eMove, onMove}) {
    this.x = 0
    this.minX = 0
    this.elem = elem
    this.eMove = eMove
    this.onMove = onMove
    this.boxWidth = 0
    this.contWidth = 0
    this.ratio = 0
    const that = this
    // let isBar
    const dragx = this.dragx = Dragx({
      elem,
      onDown: e => {
        // isBar = e.target.classList.contains('bar') ? -1 : 1
      },
      onMove (x) {
        // this.x = this.move(x)
        that.onMove(dragx.x = that.move(x))
      }
    })
  }
  move (x) {
    let {minX, eMove} = this
    if (x > 0) x = 0
    if (x < minX) x = minX
    eMove.style[transform] = `translate3d(${x}px,0,0)`
    return x
  }
  update () {
    this.boxWidth = this.elem.clientWidth
    this.contWidth = this.eMove.scrollWidth
    this.minX = this.boxWidth - this.contWidth
    this.ratio = this.boxWidth / this.contWidth

    const {dragx} = this
    let x = dragx.x = this.move(dragx.x)
    this.onMove(x)
  }
}
