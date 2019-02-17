/**
 * 起始元素到目标上级元素坐标
 @param {Element} initial  起始元素
 @param {Element} target 目标上级元素，必须为参照元素
 @return {Object} xy坐标
 @raise
 target必须为参照元素

 @example
 var xy = relativeXY(initial, target);
 */

export default function relativexy (initial, target) {
  let x = 0
  let y = 0
  let curr = initial

  while (curr !== target) {
    x += curr.offsetLeft
    y += curr.offsetTop

    curr = curr.offsetParent
    // 加上边框宽
    if (curr !== target) {
      x += curr.clientLeft
      y += curr.clientTop
    }
  }

  return { x, y }
}
