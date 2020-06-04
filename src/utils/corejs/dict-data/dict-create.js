/**
 * 分组字典
 *
 * 用来做索引的值可能有相同值的情况，所以分组
 *
 * @param {array} list 源数据
 * @param {string} name 字段名，用此字段的值做key
 * @param {function} keyHandle 可选。定制 key，默认直接用
 * @return {object} 字典数据
 *  */
export default function dictCreate (list, name, keyHandle = k => k) {
  const newList = {}
  list.forEach(item => {
    const key = keyHandle(item[name])
    let child = newList[key]
    if (child === undefined) {
      child = newList[key] = []
    }
    child.push(item)
  })
  return newList
}
