
export default function each (obj, fn) {
  for (let k in obj) {
    if (obj.hasOwnProperty(k) && fn(obj[k], k) === false) break
  }
}
