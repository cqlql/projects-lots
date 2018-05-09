export default class {
  constructor () {
    this.index = 0
    this.history = []
    // this.clear = function () {}
    this.change = function () {}
  }
  back () {
    let {index} = this
    index--
    if (index < 0) {
      this.index = 0
    } else {
      // this.clear()
      this.change(this.history[index - 1])
    }
  }
  push (record) {
    let {index} = this
    this.history.length = index
    history.push(record)
    this.index = index + 1
  }
}
