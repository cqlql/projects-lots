/**
 * 针对pc鼠标事件实现
 *
 * 此处使用了点点相加处理，如需更加灵活，请使用drag-base
 *
 * 兼容性：ie9+
 */

import dargBase from './drag'
import Figure from './figure'

let figure = new Figure()

export default function drag ({
  elem,
  onMove,
  onDown = () => {},
  onStart = () => {},
  onEnd
}) {
  dargBase({
    elem,
    onMove (e) {
      let touche = e.touches ? e.touches[0] : e
      figure.move(touche.pageX, touche.pageY, function (x, y) {
        onMove({x, y, e})
      })
    },
    onDown (e) {
      if (onDown(e) === false) return false
    },
    onStart (e) {
      onStart(e)
      let touche = e.touches ? e.touches[0] : e
      figure.start(touche.pageX, touche.pageY)
    },
    onEnd
  })
}
