import transitionendOnce from './transitionend-once'

/**
 *
 * 注意！！！如果目标css并未操作改变，将无法触发 transitionend。
 * 可以设置过度前的 css 避免
 *
 * @param {Element} el
 * @param {String} active 动画进行时不能改变 active 多次执行函数。相同的可以
 * @param {Object} to
 */
export default function ({ el, active, to, end = () => {} }) {
  let { classList } = el
  // 目前以 active 判断是否进行动画
  // 非动画进行时才注册
  if (!classList.contains(active)) {
    classList.add(active)
    el._removeTransitionEnd = transitionendOnce(el, function () {
      classList.remove(active)
      end()
    })
  }
  if (to) {
    classList.add(to)
  }
}
// function eventBind (el, type, fn) {
//   el[type]('transitionend', fn)
//   el[type]('webkitTransitionEnd', fn)
// }
