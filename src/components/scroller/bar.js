import autoprefix from '@/modules/corejs/dom-css/autoprefix'
const transform = autoprefix('transform')
export default class {
  constructor ({eBarBox, eBar, getRatio}) {
    this.eBarBox = eBarBox
    this.eBar = eBar
    this.getRatio = getRatio
    this.boxWidth = 0
  }
  update () {
    const boxWidth = this.boxWidth = this.eBarBox.clientWidth
    this.eBar.style.width = boxWidth * this.getRatio() + 'px'
  }
  move (x) {
    x = -x * this.getRatio()
    this.eBar.style[transform] = `translate3d(${x}px,0,0)`
  }
}
