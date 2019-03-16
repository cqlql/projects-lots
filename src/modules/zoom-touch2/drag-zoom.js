import drag from '../corejs/dom-drag/drag-mobile'
export default class ZoomTouch {
  constructor (elem) {
    this.zStartLen = 0
    this.dragZoom(elem)
  }
  onDown () {}
  onStart (pageX, pageY) {}
  onMove (pageX, pageY, scale) {}
  onEnd () {}
  dragZoom (elem) {
    drag({
      elem,
      onDown: e => this.onDown(e),
      onStart: e => {
        let { touches } = e
        let { length } = touches
        if (length > 1) {
          this.zoomStart(touches)
        } else {
          this.singleStart(touches[0])
        }
      },
      onMove: e => {
        e.preventDefault()
        let { touches } = e
        let { length } = touches
        if (length > 1) {
          this.zoomMove(touches)
        } else {
          this.singleMove(touches[0])
        }
      },
      onEnd: e => this.onEnd()
    })
  }
  singleStart ({ pageX, pageY }) {
    this.onStart(pageX, pageY)
  }
  zoomStart ({ 0: t1, 1: t2 }) {
    let { pageX: x1, pageY: y1 } = t1
    let { pageX: x2, pageY: y2 } = t2

    let xlen = x2 - x1
    let ylen = y2 - y1

    this.zStartLen = Math.sqrt(Math.pow(xlen, 2) + Math.pow(ylen, 2))

    // 中心点
    let cx = x1 + xlen / 2
    let cy = y1 + ylen / 2
    this.onStart(cx, cy)
  }

  singleMove (touche) {
    let { pageX, pageY } = touche
    this.onMove(pageX, pageY, 1)
  }
  zoomMove ({ 0: t1, 1: t2 }) {
    let { pageX: x1, pageY: y1 } = t1
    let { pageX: x2, pageY: y2 } = t2
    let xlen = x2 - x1
    let ylen = y2 - y1

    let zLen = Math.sqrt(Math.pow(xlen, 2) + Math.pow(ylen, 2))
    let scale = zLen / this.zStartLen

    // 中心点
    let cx = x1 + xlen / 2
    let cy = y1 + ylen / 2

    this.onMove(cx, cy, scale)
  }
}
