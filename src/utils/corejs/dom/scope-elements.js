/**
 * 范围元素遍历
 * @description
 * 目标元素逐个往上找 实现查找范围内的所有元素，或者说是赛选某元素内的所有元素
 * 如果条件一直不满足，将直到 parentElement 返回 null 停止
 * @param startNode 起始节点
 * @param listener 遍历执行函数
 * @created by cql on 2017/3/23.
 * @example
 * scopeElements(e.target, elem => {
 * if (elem === end) return false
 *   if (elem.tagName === 'H2') {
 *     // do something...
 *     return false
 *   }
 *   return otherHandle() // 其他处理，返回false 结束
 * })
 */
export default function scopeElements (startNode, listener) {
  const startElem = startNode.nodeType === 1 ? startNode : startNode.parentElement
  go(startElem)
  function go (elem, child) {
    const res = listener(elem, child)
    if (res !== false) {
      const parentElement = elem.parentElement
      if (parentElement) go(parentElement, elem)
    }
  }
}
