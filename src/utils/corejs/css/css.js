
import autoprefix from './autoprefix'
export default function (el, values = {}) {
  const { style } = el
  for (const k in values) {
    if (Object.prototype.hasOwnProperty.call(values, k)) {
      style[autoprefix(k)] = values[k]
    }
  }
}
