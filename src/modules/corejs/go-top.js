/**
 * 滚动到顶部。浏览器窗口滚动条动画
 * Created on 2017/4/11.
 *
 */

import Animation from './animation/animation'

let handle = function () {
  let animation = new Animation()
  let isRun = 0

  handle = function () {
    let y = pageYOffset
    if (y && !isRun) {
      isRun = 1
      animation.start(function (p) {
        window.scrollTo(0, y * (1 - p))
      }, 400, function () {
        isRun = 0
      })
    }
  }

  handle()
}

export default function goTop () {
  handle()
}
