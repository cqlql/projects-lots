/**
 * 针对pc鼠标事件实现
 *
 * 此处使用了点点相加处理，如需更加灵活，请使用drag-base
 *
 * 兼容性：ie9+
 */

import drag from './drag'

function getTarget (e) {
  return e.targetTouches ? e.targetTouches[0] : e
}

export default function ({ elem, onMove, onDown, onStart = () => {}, onEnd }) {
  let prevX
  let prevY
  drag({
    elem,
    onMove (e) {
      const target = getTarget(e)
      let {pageX, pageY} = target
      onMove({lx: pageX - prevX, ly: pageY - prevY, e})
      prevX = pageX
      prevY = pageY
    },
    onDown,
    onStart (e) {
      onStart(e)
      const target = getTarget(e)
      prevX = target.pageX
      prevY = target.pageY
    },
    onEnd
  })
}
