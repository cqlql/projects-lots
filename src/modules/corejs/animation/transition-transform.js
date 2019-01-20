// transform 专用
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
import transitionendOnce from './transitionend-once'

/**
 * @param {Element} el
 * @param {String} activeName 动画进行时不能改变 activeName 多次执行函数。相同的可以
 * @param {String} v
 * @param {Object} initValue 避免没有初始 style 无法正确检测改变问题，致使无法触发 transitionend
 */
export default function ({ el, activeName, v, initValue, end }) {
  let { style, classList } = el

  if (!classList.contains(activeName)) { // 非动画进行时才注册
    classList.add(activeName)
    transitionendOnce(el, function () {
      classList.remove(activeName)
      end()
    })
  }
  let n = autoprefix('transform')
  // 没有初始 style 情况
  if (style[n] === '' && initValue) {
    style[n] = initValue
  }
  // 相同值直接触发 end
  if (style[n] === v) {
    end()
    return
  }
  style[n] = v
}
