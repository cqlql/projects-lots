import drag from '@/modules/corejs/dom-drag/drag'

function getTarget (e) {
  return e.targetTouches ? e.targetTouches[0] : e
}

class DragPlus {
  constructor ({ elem, onMove }) {
    // this.x = 0
    // this.elem = elem
    let x = 0
    let tx
    let sx
    drag({
      elem,
      onDown () {},
      onStart (e) {
        const target = getTarget(e)
        tx = x
        sx = target.pageX
      },
      onMove (e) {
        const target = getTarget(e)
        x = target.pageX - sx + tx
        onMove(x)
      },
      onEnd () {}
    })
  }
  onMove () {

  }
}

export default function (options) {
  return new DragPlus(options)
}
