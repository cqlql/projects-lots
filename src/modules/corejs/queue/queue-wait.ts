type Cb = (data: any) => void
export default class {
  private q: Cb[] = []
  // constructor () {
  //   this.q = []
  // }
  add (cb: Cb) {
    this.q.push(cb)
  }
  // 执行所有的队列
  // ajax 情况将得到的 data 传入所有回调队列
  excu (data: any) {
    let fn = this.q.shift()
    if (fn === undefined) return
    fn(data)
    this.excu(data)
  }
  clear () {
    this.q = []
  }
}
