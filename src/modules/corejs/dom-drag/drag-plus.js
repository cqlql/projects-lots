/**
 * 此处使用了点点相加处理，如需更加灵活
 *
 * 兼容性：ie9+
 *
 * 一般使用示例：
    let lenX = 0
    let lenY = 0
    drag({
      elem: this.$el,
      onMove: ({ lx, ly }) => {
        lenX += lx
        lenY += ly
        this.d.x = lenX
        this.d.y = lenY
      },
      onStart: () => {
        lenX = this.d.x
        lenY = this.d.y
      },
      onDown: e => {
        e.preventDefault()
      }
    })
 */

import drag from './drag'

function getTarget (e) {
  return e.touches ? e.touches[0] : e
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
