
interface timerOptions {
  callback (): void
  time?: number
}

/**
 * 定时器
 * */
export default class Timer {
  time = 6000
  callback: () => void
  stopId: number|undefined
  constructor ({ callback, time }: timerOptions) {
    if (time) this.time = time
    this.callback = callback
    this.stopId = undefined
  }
  // 开始/重新开始
  start () {
    this.stop()
    let { time, callback } = this
    let loop = () => {
      this.stopId = setTimeout(() => {
        callback()
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
    this.stopId = undefined
  }
}
