import transitionendOnce from './transitionend-once'
import css from '@/utils/corejs/css/css.js'

/**
 *
 * 注意！！！如果目标css并未操作改变，将无法触发 transitionend。
 * 所以，设置动画前先判断好
 *
 * 动画进行时也可以再次调用，即使不同的 active，也就是立马进行不同的动画而且
 *
 * @param {Element} el
 * @param {String} active
 * @param {Function|Object} start 动画起始css
 * @param {Function|Object} to 动画目标css
 */
export default function ({ el, start, active, to, end = () => {} }) {
  const { classList } = el
  if (start) {
    if (typeof start === 'function') {
      start()
    } else {
      css(el, start)
    }
  }
  classList.add(active)
  transitionendOnce(el, function () {
    classList.remove(active)
    end()
  })
  if (typeof css === 'function') {
    to()
  } else {
    css(el, to)
  }
}
