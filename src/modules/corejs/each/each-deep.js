import each from './each-obj'
export default function eachDeep (obj, fn) {
  each(obj, function (value, key) {
    fn(value, key, obj)
    if (typeof value === 'object') {
      eachDeep(value, fn)
    }
  })
}
