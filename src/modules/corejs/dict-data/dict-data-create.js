// keyHandle：定制 key 情况
export default function dictCreate (list, name, keyHandle = k => k) {
  let newList = {}
  list.forEach(item => {
    let key = keyHandle(item[name])
    let child = newList[key]
    if (child === undefined) {
      child = newList[key] = []
    }
    child.push(item)
  })
  return newList
}
