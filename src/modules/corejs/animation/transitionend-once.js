// transitionend 发生后立马删除。保证一次性使用
// 多属性情况也只会执行一次 transitionend。说明删除后将不会再触发剩下的 transitionend
export default function transitionendOnce (elem, cb) {
  // function eventBind (el, type, fn) {
  //   el[type]('transitionend', fn)
  //   el[type]('webkitTransitionEnd', fn)
  // }
  let transitionend = () => {
    elem.removeEventListener('transitionend', transitionend)
    elem.removeEventListener('webkitTransitionEnd', transitionend)
    cb()
  }
  elem.addEventListener('transitionend', transitionend)
  elem.addEventListener('webkitTransitionEnd', transitionend)
}
