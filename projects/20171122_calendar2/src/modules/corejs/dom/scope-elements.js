/**
 * Created by cql on 2017/3/23.
 */

// 元素查找 目标元素逐个往上找 实现查找范围内的所有元素，或者说是赛选某元素内的所有元素
/**
 *
 快速使用
scopeElements(e.target, function (elem) {
  if (elem === end) return false
  if (elem.tagName === 'H2') {
    // do something...
    return false
  }
  // return otherHandle() // 支持函数的其他处理，返回false 结束
})
 */
export default function scopeElements (targetElem, listener) {
  targetElem = targetElem.nodeType === 1 ? targetElem : targetElem.parentElement
  go(targetElem)

  function go (that, child) {
    if (listener(that, child) !== false) {
      go(that.parentElement, that)
    }
  }
}
