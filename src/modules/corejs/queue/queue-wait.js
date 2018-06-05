
export default class {
  constructor () {
    this.q = []
  }
  add (cb) {
    this.q.push(cb)
  }
  excu (params) {
    let fn = this.q.shift()
    if (fn === undefined) return
    fn(params)
    this.excu(params)
  }
  clear () {
    this.q = []
  }
}
