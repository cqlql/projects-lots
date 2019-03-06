/**
 * 取元素坐标 相对于内容窗口 - 精确实现，会考虑 transform
 * 目前支持到ie9，如需支持ie8，则不能使用 pageYOffset/pageXOffset
 *
 * @param elem 要获取的元素
 * */

// import { scrollLeft, scrollTop } from './scroll-window'

export default function elPageXY (elem) {
  let { left: x, top: y } = elem.getBoundingClientRect()
  y += pageYOffset
  x += pageXOffset
  return { y, x }
}
