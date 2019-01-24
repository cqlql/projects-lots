import each from '@/modules/corejs/each/each-obj'
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
/* 检测指定 style 属性值是否一样 */

export default function styleIsSame (el, to) {
  let { style } = el
  let same = true // css 值与当前值是否一样
  each(to, (v, n) => {
    n = autoprefix(n)
    if (style[n] !== v) {
      return (same = false)
    }
  })
  return same
}
