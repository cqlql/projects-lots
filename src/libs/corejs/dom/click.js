/*
 * click
 * pc+移动端都适用。 对移动端有优化
 * 兼容性：ie9+
 * */

let click = function (elem, fn) {
  // 鉴于华为手机的奇葩性质，Android 7 依然click高亮。。。
  if (/Android|iPad|iPhone/.test(navigator.userAgent)) {
    click = function (elem, fn) {
      let touchdown
      let touchcancel

      elem.addEventListener('touchstart', touchstart, true)
      elem.addEventListener('touchmove', touchmove, true)
      elem.addEventListener('touchend', touchend, true)

      function touchend (e) {
        if (touchcancel) return
        if (touchdown) fn.call(this, e)
        touchdown = touchcancel = false
      }

      function touchstart () {
        touchdown = true
        touchcancel = false
      }

      function touchmove () {
        touchcancel = true
      }

      return function () {
        elem.removeEventListener('touchend', touchend)
        elem.removeEventListener('touchstart', touchstart)
        elem.removeEventListener('touchmove', touchmove)
      }
    }

    // 解决其他延迟问题
    document.addEventListener('click', e => {
      let {target} = e
      // 解决 a 标签点击跳转延迟
      if (target.tagName === 'A') {
        let {href} = target
        if (href) {
          location.href = href
          e.preventDefault()
        }
      }
    })
  } else {
    click = function (elem, fn) {
      elem.addEventListener('click', fn)
      return function () {
        elem.removeEventListener('click', fn)
      }
    }
  }

  return click(elem, fn)
}

export default function (elem, fn) {
  return click(elem, fn)
}
