
export default class {
  constructor () {
    this.q = []
  }
  add (cb) {
    this.q.push(cb)
  }
  excu () {
    let fn = this.q.shift()
    if (fn === undefined) return
    fn()
    this.excu()
  }
  clear () {
    this.q = []
  }
}
