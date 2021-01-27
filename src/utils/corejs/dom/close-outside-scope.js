import scopeElements from '@/utils/corejs/dom/scope-elements'

/**
 *
 * @param {*} el 范围内最外层元素
 * @param {*} check 返回true 表示范围内，不关闭
 * @param {*} close 执行关闭
 */
export default function closeOutsideScope ({ el, check, close = () => {} }) {
  let outside = false
  el.addEventListener('click', function (e) {
    outside = true
    scopeElements(e.target, currentElem => {
      if (currentElem === el) return false
      if (check(currentElem)) {
        outside = false
        return false
      }
    })
  })

  function clickWindow () {
    if (outside) {
      close()
    }
  }

  window.addEventListener('click', clickWindow)

  return function off () {
    window.removeEventListener('click', clickWindow)
  }
}
