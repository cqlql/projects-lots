/**
 * 定时器
 * */
export default class Timer {
  constructor ({callBack, time}) {
    this.time = time
    this.callBack = callBack
  }

  // 停止情况调用无效
  start () {
    this.stop()

    let {time, callBack} = this

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
