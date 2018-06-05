import drag from '@/modules/corejs/dom-drag/drag'
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
const transform = autoprefix('transform')
function getTarget (e) {
  return e.targetTouches ? e.targetTouches[0] : e
}

export default class {
  constructor ({elem, eMove, onMoveBar, onStartBar, onEndBar, $style}) {
    this.$style = $style
    this.x = 0
    this.minX = 0
    this.elem = elem
    this.eMove = eMove
    this.onMoveBar = onMoveBar
    this.onStartBar = onStartBar
    this.onEndBar = onEndBar
    this.boxWidth = 0
    this.contWidth = 0
    this.ratio = 0
    let tx
    let sx
    let isBar
    let ratio
    drag({
      elem,
      onDown: e => {
        isBar = e.target.classList.contains(this.$style.bar)
        ratio = this.ratio
      },
      onStart: e => {
        e.preventDefault()
        const target = getTarget(e)
        tx = this.x
        sx = target.pageX
        if (isBar) {
          this.onStartBar()
        }
      },
      onMove: e => {
        const target = getTarget(e)
        let len = target.pageX - sx
        if (isBar) len = -len / ratio
        let x = len + tx
        this.move(x)
        onMoveBar(this.x)
      },
      onEnd: () => {
        if (isBar) {
          this.onEndBar()
        }
      }
    })
  }
  move (x) {
    let {minX, eMove} = this
    if (x > 0) x = 0
    if (x < minX) x = minX
    eMove.style[transform] = `translate3d(${x}px,0,0)`
    this.x = x
  }
  update () {
    this.boxWidth = this.elem.clientWidth
    this.contWidth = this.eMove.scrollWidth
    this.minX = this.boxWidth - this.contWidth
    this.ratio = this.boxWidth / this.contWidth

    this.move(this.x)
    this.onMoveBar(this.x)
  }
  wheel (isDown) {
    let x = 30 * (isDown ? -1 : 1) + this.x
    this.move(x)
    this.onMoveBar(this.x)
  }
}
