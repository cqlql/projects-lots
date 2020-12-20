/**
 * 取元素坐标 相对于内容窗口 - 忽略 transform
 * 无法精确到小数点，会四舍五入
 * 避免对body设置fixed，否则可能不准确
 * 目前支持到ie9，如需支持ie8，则不能使用 pageYOffset/pageXOffset
 *
 * @param elem 要获取的元素
 *
 * */

// import { scrollLeft, scrollTop } from './scroll-window'

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
        // fixed 元素情况，此时加上窗口滚动条距离即可

        // y += scrollTop()
        // x += scrollLeft()

        // 使用不支持 ie678 属性
        y += pageYOffset
        x += pageXOffset
      }
      break
    }
  } while (true)

  return { y, x }
}
