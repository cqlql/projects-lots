import autoprefix from '@/modules/corejs/dom-css/autoprefix'
import each from '@/modules/corejs/each/each-obj'
import transitionendOnce from './transitionend-once'

/**
 * @param {Element} el
 * @param {String} activeName 动画进行时不能改变 activeName 多次执行函数。相同的可以
 * @param {Object} css
 * @param {Object} initCss 避免没有初始 style 无法正确检测改变问题，致使无法触发 transitionend
 */
export default function ({ el, activeName, css, initCss, end }) {
  let { style, classList } = el

  if (!classList.contains(activeName)) { // 非动画进行时才注册
    classList.add(activeName)
    transitionendOnce(el, function () {
      classList.remove(activeName)
      end()
    })
  }

  let cssSame = true // css 值与当前值是否一样
  each(css, (v, n) => {
    n = autoprefix(n)
    // 没有初始 style 情况
    if (style[n] === '') {
      let initV = initCss && initCss[n]
      if (initV) style[n] = initV
    }
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
