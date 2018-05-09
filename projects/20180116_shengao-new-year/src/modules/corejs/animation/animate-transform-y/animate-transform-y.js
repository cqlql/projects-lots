import transitionendOnce from '../transitionend-once'
import autoprefix from '../../dom/css/autoprefix'
let transform = autoprefix('transform')[1]
export default class AnimateTransformY {
  constructor () {
    this.y = 0
    this.transitionActiveClassName = 'transition-active'
  }
  setStartY (y) {
    this.y = y
  }
  setTransitionActiveClassName (className) {
    this.transitionActiveClassName = className
  }
  start (el, y, complete) {
    if (this.y === y) {
      complete()
    } else {
      setTimeout(() => {
        let {transitionActiveClassName} = this
        let {classList} = el
        classList.add(transitionActiveClassName)
        el.style[transform] = `translateY(${y}px)`
        transitionendOnce(el, function () {
          classList.remove(transitionActiveClassName)
          complete()
        })
        this.y = y
      }, 0)
    }
  }
}
