
export default function each (obj, fn) {
  for (let k in obj) {
    if (obj.hasOwnProperty(k) && fn(obj[k], k) === false) break
  }
}

export function eachDeep (obj, fn) {
  each(obj, function (value, key) {
    fn(value, key, obj)
    if (typeof value === 'object') {
      eachDeep(value, fn)
    }
  })
}
