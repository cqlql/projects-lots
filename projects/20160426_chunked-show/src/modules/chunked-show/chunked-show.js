import drag from '../corejs/drag/drag-plus'
// import dragMobile from 'corejs/dist/drag/drag-plus-mobile';
/* eslint-disable */
export default class ChunkedShow {
  constructor (eBox) {
    this.eBox = eBox
  }
  init () {
    // 保证初始化只会进行一次
    if (this.isInit) return
    this.isInit = true

    let eBox = this.eBox
    let child = eBox.children
    this.eTopHalf = child[0]
    let eDrag = child[1]
    this.eBottomHalf = child[2]

    this.moveY = 0
    this.boxH = 0

    let moveY
    drag({
      elem: eDrag,
      onDown (e) {
        e.preventDefault()
      },
      onStart: () => {
        moveY = this.moveY
      },
      onMove: ({y}) => {
        moveY += y
        this.move(moveY)
      }
    })
  }

  move (y) {
    let {boxH} = this

    let minY = 30
    let maxY = boxH - 30
    if (y < minY) y = minY
    else if (y > maxY) y = maxY

    this.eTopHalf.style.height = y + 'px'
    this.eBottomHalf.style.top = y + 'px'

    this.moveY = y
  }

  show () {
    this.init()

    let {eBox, eTopHalf} = this
    eBox.classList.add('show')
    this.boxH = eBox.clientHeight
    this.move(eTopHalf.children[0].clientHeight)
  }
  hide () {
    this.eBox.classList.remove('show')
    this.eTopHalf.style.height = 'auto'
    this.eBottomHalf.style.top = 'auto'
  }
}
