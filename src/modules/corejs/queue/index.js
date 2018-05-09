export default class {
  constructor () {
    this.q = []
    this.isRun = false
  }
  excu (fn) {
    this.q.push(fn)
    this.start()
  }
  start () {
    if (this.isRun) return
    let fn = this.q.shift()
    if (fn === undefined) return false
    this.isRun = true
    fn(() => {
      this.isRun = false
      return this.start()
    })
  }
}
