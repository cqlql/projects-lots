import drag from '@/modules/corejs/dom-drag/drag'

function getTarget (e) {
  return e.targetTouches ? e.targetTouches[0] : e
}

class DragPlus {
  constructor ({ elem, onMove, onDown }) {
    this.x = 0
    let tx
    let sx
    const that = this
    drag({
      elem,
      onDown,
      onStart (e) {
        e.preventDefault()
        const target = getTarget(e)
        tx = that.x
        sx = target.pageX
      },
      onMove (e) {
        const target = getTarget(e)
        onMove(target.pageX - sx + tx)
      }
    })
  }
}

export default function (options) {
  return new DragPlus(options)
}
