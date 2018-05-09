/**
 * 拖动基础-pc
 * 针对pc鼠标事件实现
 * 注意：只要触发onStart,即使没有onMove,都会触发onEnd
 *
 * 兼容性：ie9+
 *
 * @param onDown 可通过 return false 阻止拖动发送
 */
export default function drag ({ elem, onMove, onDown = function () {}, onStart = function () {}, onEnd = function () {} }) {
  elem.addEventListener('mousedown', down)

  function down (e) {
    if (onDown(e) === false) return

    onStart(e)

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)

    function mousemove (e) {
      onMove(e)
    }

    function mouseup () {
      onEnd()

      // 解除所有事件
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }
  }
}
