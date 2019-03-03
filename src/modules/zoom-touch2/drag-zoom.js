import drag from '../corejs/dom-drag/drag-mobile'
export default class ZoomTouch {
  constructor (elem) {
    this.zStartLen = 0
    this.dragZoom(elem)
  }
  onStart (clientX, clientY) {}
  onMove (clientX, clientY, scale) {}
  dragZoom (elem) {
    drag({
      elem,
      onStart: (e) => {
        let { touches } = e
        let { length } = touches
        if (length > 1) {
          this.zoomStart(touches)
        } else {
          this.singleStart(touches[0])
        }
      },
      onMove: (e) => {
        e.preventDefault()
        let { touches } = e
        let { length } = touches
        if (length > 1) {
          this.zoomMove(touches)
        } else {
          this.singleMove(touches[0])
        }
      }
    })
  }
  singleStart ({ clientX, clientY }) {
    this.onStart(clientX, clientY)
  }
  zoomStart ({ 0: t1, 1: t2 }) {
    let { clientX: x1, clientY: y1 } = t1
    let { clientX: x2, clientY: y2 } = t2

    let xlen = x2 - x1
    let ylen = y2 - y1

    this.zStartLen = Math.sqrt(Math.pow(xlen, 2) + Math.pow(ylen, 2))

    // 中心点
    let cx = x1 + xlen / 2
    let cy = y1 + ylen / 2
    this.onStart(cx, cy)
  }

  singleMove (touche) {
    let { clientX, clientY } = touche
    this.onMove(clientX, clientY, 1)
  }
  zoomMove ({ 0: t1, 1: t2 }) {
    let { clientX: x1, clientY: y1 } = t1
    let { clientX: x2, clientY: y2 } = t2
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
