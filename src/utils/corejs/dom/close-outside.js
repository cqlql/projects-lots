/**
 *
 * @param {Element, Array} els 可以单个，也可以多个(有forEach的集合)
 * @param {Function} close 执行关闭
 */
export default function closeOutside ({ els, close }) {
  if (!els.forEach) {
    els = [els]
  }
  let outside = true
  function clickElem () {
    outside = false
  }

  els.forEach(el => {
    el.addEventListener('click', clickElem)
  })

  function clickWindow () {
    if (outside) {
      close()
    }
    outside = true
  }
  window.addEventListener('click', clickWindow)

  return function off () {
    window.removeEventListener('click', clickWindow)
  }
}
