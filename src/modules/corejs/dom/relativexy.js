/**
 * 起始元素到目标上级元素坐标
 @@ relativeXY
 @example
 var xy = c.relativeXY(initial, target);
 @param initial [element]  起始元素
 @param target [element] 目标上级元素，必须为参照元素
 @return [obj] xy坐标
 @raise
 target必须为参照元素
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

  return {x, y}
}
