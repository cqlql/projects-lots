// 计时
export default class {
  constructor () {
    this.stopId = null
  }
  // 顺计时，默认0起始
  start (cb, time = 0) {
    this.stop() // 开始前结束，避免开启2次

    // let time = 0
    this.stopId = setInterval(() => {
      time++
      cb(time) === false && this.stop()
    }, 1000)
    cb(time) === false && this.stop()
  }
  stop () {
    clearInterval(this.stopId)
  }
  // 倒计时
  timeDown (update, finish, timeCount) {
    this.start(t => {
      let v = timeCount - t
      update(v)
      if (!v) {
        this.stop()
        finish()
      }
    })
  }
}
