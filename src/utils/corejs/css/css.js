
import autoprefix from './autoprefix'
export default function (el, values = {}) {
  const { style } = el
  for (const k of values) {
    // for in 才需要，目前使用 for of
    // if (Object.prototype.hasOwnProperty.call(values, k))

    style[autoprefix(k)] = values[k]
  }
}
