
export default function each (obj, fn) {
  const { hasOwnProperty } = Object.prototype
  for (const k in obj) {
    if (hasOwnProperty.call(obj, k) && fn(obj[k], k) === false) break
  }
}
