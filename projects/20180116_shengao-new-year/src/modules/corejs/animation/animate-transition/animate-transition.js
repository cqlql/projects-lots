/**
 * AnimateTransformY
 * complete 不会触发情况：目标值与当前值一样，此种情况不能调用 start，请再调用前判断好
 */

import autoprefix from '../../dom/css/autoprefix'
import transitionendOnce from '../transitionend-once'

let transition = autoprefix('transition')[1]

export default class {
  constructor () {
    this.transition = '0.3 ease'
  }
  setTransition (v) {
    this.transition = v
  }
  start (el, css, complete) {
    setTimeout(() => {
      let {style} = el
      style[transition] = this.transition
      for (let name in css) {
        style[autoprefix(name)[1]] = css[name]
      }
      transitionendOnce(el, function () {
        style[transition] = 'none'
        complete()
      })
    }, 0)
  }
}
