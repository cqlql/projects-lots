
export default class {
  constructor () {
    this.q = []
  }
  add (cb) {
    this.q.push(cb)
  }
  // 执行所有的队列
  // ajax 情况将得到的 data 传入所有回调队列
  excu (data) {
    let fn = this.q.shift()
    if (fn === undefined) return
    fn(data)
    this.excu(data)
  }
  clear () {
    this.q = []
  }
}
