/**
 * 范围元素遍历
 * @description
 * 目标元素逐个往上找 实现查找范围内的所有元素，或者说是赛选某元素内的所有元素
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
 export default function scopeElements (startNode: Node, listener: (elem: HTMLElement, child: HTMLElement | undefined) => boolean | undefined) {
   let startElem = startNode.nodeType === 1 ? startNode : startNode.parentElement
   go(startElem as HTMLElement)
 
   function go (elem: HTMLElement, child?: HTMLElement) {
     if (listener(elem, child) !== false) {
       let parentElement = elem.parentElement
       if (parentElement) go(parentElement, elem)
     }
   }
 }
 