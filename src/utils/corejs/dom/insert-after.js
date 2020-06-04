
import toFragment from './to-fragment'

/**
 *
 * 紧邻元素之后插入
 @param (element) item 位置元素。将紧邻此元素之后追加
 @param (HTMLCollection,NodeList,array,string) newItems 追加的元素，可以是多个。html可以标签文本随意组合

 @return (array) 新加的节点集合
 */
export default function insertAfter(item, newItems) {
  newItems = toFragment(newItems);

  let next = item.nextElementSibling;

  if (next) {
    item.parentNode.insertBefore(newItems, next);
  } else {
    item.parentNode.appendChild(newItems);
  }

}
