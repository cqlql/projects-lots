/**
 * 定时器
 * */
export default class Timer {
  /**
   * @param {Function} allowStart 必须满足此条件才能开始，默认 true
   */
  constructor ({ callBack, time, allowStart = () => true }) {
    this.time = time
    this.callBack = callBack
    this.allowStart = allowStart
    this.stopId = null
  }

  // 开始/重新开始
  start () {
    this.stop()
    if (!this.allowStart()) return

    let { time, callBack } = this

    let loop = () => {
      this.stopId = setTimeout(() => {
        callBack()
        loop()
      }, time)
    }

    loop()
  }

  // 开始，只有停止情况才开始
  tryStart () {
    if (this.stopId) return
    this.start()
  }

  stop () {
    clearTimeout(this.stopId)
    this.stopId = null
  }
}
