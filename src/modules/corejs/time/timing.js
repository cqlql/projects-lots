// 计时
export default class {
  constructor () {
    this.stopId = null
  }
  // 顺计时，默认0起始
  start (update, second = 0) {
    this.stop() // 开始前结束，避免开启2次

    // let time = 0
    this.stopId = setInterval(() => {
      second++
      update(second) === false && this.stop()
    }, 1000)
    update(second) === false && this.stop()
  }
  stop () {
    clearInterval(this.stopId)
  }
  // 倒计时
  timeDown (update, finish, secondTotal) {
    this.start(s => {
      let v = secondTotal - s
      update(v)
      if (!v) {
        this.stop()
        finish()
      }
    })
  }
}
