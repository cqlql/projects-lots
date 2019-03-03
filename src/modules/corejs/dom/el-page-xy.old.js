/**
 * 取元素坐标 相对于内容窗口 - 旧实现
 * 无法精确到小数点，会四舍五入，有精确要求使用 el-page-xy
 * 避免对body设置fixed，否则可能不准确
 * 支持ie678
 *
 * @param elem 要获取的元素
 *
 * */

import { scrollLeft, scrollTop } from './scroll-window'

export default function elPageXY (elem) {
  let y = 0
  let x = 0

  if (elem === document) {
    return { y, x }
  }

  do {
    y = y + elem.offsetTop + elem.clientTop
    x = x + elem.offsetLeft + elem.clientLeft

    let pre = elem
    elem = elem.offsetParent
    // 处理对fixed支持。由于fixed元素offsetParent直接就返回null，所以tagName取到的是自身。非fixed元素只有到body后才会返回null
    if (elem === null) {
      if (pre.tagName !== 'BODY') {
        y += scrollTop()
        x += scrollLeft()

        // 使用不支持 ie678 属性
        // y += pageYOffset
        // x += pageXOffset
      }
      break
    }
  } while (true)

  return { y, x }
}
