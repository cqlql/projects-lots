import autoprefix from '@/modules/corejs/dom-css/autoprefix'
import each from '@/modules/corejs/each/each-obj'
import transitionendOnce from '@/modules/corejs/animation/transitionend-once'

/**
 *
 * 注意！！！起始 css 如果跟目标 css 相同，将无法触发 transitionend
 *
 * @param {Element} el
 * @param {String} activeName 动画进行时不能改变 activeName 多次执行函数。相同的可以
 * @param {Object} css
 */
export default function ({ el, activeName, css, end = () => {} }) {
  let { classList } = el

  // 目前以 activeName 判断是否进行动画
  // 非动画进行时才注册
  if (!classList.contains(activeName)) {
    classList.add(activeName)
    transitionendOnce(el, function () {
      classList.remove(activeName)
      end()
    })
  }
  if (css) {
    console.log(css)
    classList.add(css)
  }
}
