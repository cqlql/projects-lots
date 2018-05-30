import autoprefix from '@/modules/corejs/dom-css/autoprefix'
const transform = autoprefix('transform')
export default class {
  constructor ({eBarBox, eBar, getRatio, $style}) {
    this.eBarBox = eBarBox
    this.eBar = eBar
    this.getRatio = getRatio
    this.boxWidth = 0
    this.$style = $style
  }
  update () {
    const {eBarBox, eBar, $style} = this
    eBarBox.style.display = 'block'
    const boxWidth = this.boxWidth = this.eBarBox.clientWidth
    eBarBox.style.display = ''
    const barWidth = boxWidth * this.getRatio()
    if (boxWidth === barWidth) {
      eBarBox.classList.remove($style.show)
      // eBarBox.style.display = 'none'
    } else {
      eBar.style.width = barWidth + 'px'
      eBarBox.classList.add($style.show)
      // eBarBox.style.display = 'block'
    }
  }
  move (x) {
    x = -x * this.getRatio()
    this.eBar.style[transform] = `translate3d(${x}px,0,0)`
  }
}
