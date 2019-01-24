import autoprefix from '@/modules/corejs/dom-css/autoprefix'
import each from '@/modules/corejs/each/each-obj'
import transitionendOnce from './transitionend-once'

/**
 *
 * 注意！！！如果目标css并未操作改变，将无法触发 transitionend。
 * 所以，设置动画前先判断好
 *
 * @param {Element} el
 * @param {String} active 动画进行时不能改变 active 多次执行函数。相同的可以
 * @param {Object} to
 */
export default function ({ el, active, to, end = () => {} }) {
  let { style, classList } = el

  // 目前以 active 判断是否进行动画
  // 非动画进行时才注册
  if (!classList.contains(active)) {
    classList.add(active)
    transitionendOnce(el, function () {
      classList.remove(active)
      end()
    })
  }

  each(to, (v, n) => {
    style[autoprefix(n)] = v
  })
}
