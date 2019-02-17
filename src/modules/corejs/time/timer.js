/**
 * 定时器
 * */
export default class Timer {
  /**
   * @param {Function} tryStart 只有满足条件才能开始，默认 true
   */
  constructor ({ callBack, time, tryStart = () => true }) {
    this.time = time
    this.callBack = callBack
    this.tryStart = tryStart
  }

  // 开始/重新开始
  start () {
    this.stop()
    if (!this.tryStart()) return

    let { time, callBack } = this

    let loop = () => {
      this.stopId = setTimeout(() => {
        callBack()
        loop()
      }, time)
    }

    loop()
  }

  stop () {
    clearTimeout(this.stopId)
  }
}
