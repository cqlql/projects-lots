/**
 * 转 DocumentFragment
 *
 * Created by cql on 2017/4/1.
 *
 * @param newitems 元素集合,支持单个元素,可以是装载元素的数组,或者是jq对象，或者 HTMLCollection
 *                 这里没兼容html字符串是考虑到 node 和 elem 情况--到底是返回所有node还是只返回elem
 * @param loop 循环回调，每处理一个元素便回调一次，传入索引
 *
 * */
export default function toFragment (newitems, loop = () => {}) {
  let df = document.createDocumentFragment()
  let total = newitems.length

  // /// 0 单个元素情况，直接返回
  if (total === undefined) {
    df.appendChild(newitems)
    loop(0, newitems)
    return df
  }

  // /// 1 先处理第一个，识别 HTMLCollection 与 数组、jq对象
  let getItem = function (i) {
    return newitems[i]
  }
  let item = newitems[0]
  df.appendChild(item)
  loop(0, item)

  // HTMLCollection 情况
  if (newitems.length < total) {
    getItem = function () {
      return newitems[0]
    }
  }

  // /// 2 处理剩下的
  for (let i = 1; i < total; i++) {
    let item = getItem(i)
    df.appendChild(item)
    loop(i, item)
  }

  return df
}
