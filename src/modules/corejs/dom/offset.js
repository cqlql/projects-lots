/**
 * [坐标] 元素 相对 于内容窗口
 * 避免对body设置fixed，否则可能不准确
 *
 * @param elem 要获取的元素
 *
 * Created by cql on 2017/3/23.
 *
 * v1.0.1
 * 新增对fixed支持
 *
 * */

import scrollLeft from './scroll-left'
import scrollTop from './scroll-top'

export default function offsetxy (elem) {
  let top = 0
  let left = 0

  if (elem === document) {
    return {top, left}
  }

  do {
    top = top + elem.offsetTop + elem.clientTop
    left = left + elem.offsetLeft + elem.clientLeft

    let pre = elem
    elem = elem.offsetParent
    // 处理对fixed支持。由于fixed元素offsetParent直接就返回null，所以tagName取到的是自身。非fixed元素只有到body后才会返回null
    if (elem === null) {
      if (pre.tagName !== 'BODY') {
        top += scrollTop()
        left += scrollLeft()
      }
      break
    }
  } while (true)

  return {top, left}
}
