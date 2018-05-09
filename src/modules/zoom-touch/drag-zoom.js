/**
 * DragZoom
 * */

import drag from '../corejs/dom-drag/drag-mobile'

export default function ({elem, onStart, onMove}) {
  let zStartLen

  function singleStart ({pageX, pageY}) {
    onStart(pageX, pageY)
  }

  function zoomStart ({0: t1, 1: t2}) {
    let {pageX: x1, pageY: y1} = t1
    let {pageX: x2, pageY: y2} = t2

    let xlen = x2 - x1
    let ylen = y2 - y1

    zStartLen = Math.sqrt(Math.pow(xlen, 2) + Math.pow(ylen, 2))

    // 中心点
    let cx = x1 + xlen / 2
    let cy = y1 + ylen / 2
    onStart(cx, cy)
  }

  function singleMove (touche) {
    let {pageX, pageY} = touche
    onMove(pageX, pageY, 1)
  }

  function zoomMove ({0: t1, 1: t2}) {
    let {pageX: x1, pageY: y1} = t1
    let {pageX: x2, pageY: y2} = t2
    let xlen = x2 - x1
    let ylen = y2 - y1

    let zLen = Math.sqrt(Math.pow(xlen, 2) + Math.pow(ylen, 2))
    let scale = zLen / zStartLen

    // 中心点
    let cx = x1 + xlen / 2
    let cy = y1 + ylen / 2

    onMove(cx, cy, scale)
  }

  drag({
    elem,
    onStart: (e) => {
      let touches = e.targetTouches
      let {length} = touches
      if (length > 1) {
        zoomStart(touches)
      } else {
        singleStart(touches[0])
      }
    },
    onMove: (e) => {
      e.preventDefault()
      let touches = e.targetTouches
      let {length} = touches
      if (length > 1) {
        zoomMove(touches)
      } else {
        singleMove(touches[0])
      }
    }
  })
}
