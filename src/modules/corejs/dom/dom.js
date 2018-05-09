/* eslint-disable */
/* 仿jq */
import autoPrefix from './autoprefix'

class DomHandle {
  constructor (el) {
    this.el = el
  }
  css (name, value, auto) {
    if (auto) name = autoPrefix(name)[1]
    this.el.style[name] = value
    return this
  }
}

export default function (el) {
  return new DomHandle(el)
}
