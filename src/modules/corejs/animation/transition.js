import autoprefix from '@/modules/corejs/dom-css/autoprefix'
import each from '@/modules/corejs/each/each-obj'
import transitionendOnce from './transitionend-once'

/**
 *
 * 注意！！！必须设置初始 style，否则无法正确检测改变，导致无法触发 transitionend
 *
 * @param {Element} el
 * @param {String} activeName 动画进行时不能改变 activeName 多次执行函数。相同的可以
 * @param {Object} css
 */
export default function ({ el, activeName, css, end = () => {} }) {
  let { style, classList } = el

  // 目前以 activeName 判断是否进行动画
  // 非动画进行时才注册
  if (!classList.contains(activeName)) {
    classList.add(activeName)
    transitionendOnce(el, function () {
      classList.remove(activeName)
      end()
    })
  }

  let cssSame = true // css 值与当前值是否一样
  each(css, (v, n) => {
    n = autoprefix(n)
    if (style[n] === v) {
      return
    }
    style[n] = v
    cssSame = false
  })
  if (cssSame) {
    end()
  }
}
