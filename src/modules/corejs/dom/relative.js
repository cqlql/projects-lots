/**
 * 起始元素到目标上级元素坐标
 @param {Element} initial  起始元素
 @param {Element} target 目标上级元素，必须为参照元素
 @return {Object} xy坐标
 @raise
 target必须为参照元素

 @example
 var xy = relative(initial, target);
 */

export default function relative (initial, target) {
  let left = 0
  let top = 0
  let curr = initial

  while (curr !== target) {
    left += curr.offsetLeft
    top += curr.offsetTop

    curr = curr.offsetParent
    // 加上边框宽
    if (curr !== target) {
      left += curr.clientLeft
      top += curr.clientTop
    }
  }

  return { left, top }
}
