import '../corejs/common'

export default class Animation {
  // 加速缓动
  easeIn (x, t, b, c, d) {
    // return c * (t /= d) * t * t + b
    return c * (t /= d) * t + b
  }

  // 减速缓动
  easeOut (x, t, b, c, d) {
    // easeOutQuart
    // return -c * ((t = t / d - 1) * t * t * t - 1) + b
    // easeOutSine
    // return c * Math.sin(t / d * (Math.PI / 2)) + b
    // easeOutQuad
    return -c * (t /= d) * (t - 2) + b
  }

  // params: 反复执行的函数，动画持续时间(毫秒)，到达目标位置时回调
  start (length, excu, duration = 400, complete = () => {}) {
    if (this.isRun) return
    this.isRunStop = false
    this.stopLength = undefined
    this.isRun = true

    let t = 0 // 当前起始次数
    let interval = 20 // 帧间隔
    let count = duration / interval // 总次数

    let position = 0 // 起始位置
    // let endPosition = 100 // 目标位置
    // let length = endPosition - position // 要走的总长度

    let that = this

    let preLen = 0
    let s = 0 // 速度值
    let {easeIn} = this

    function run () {
      t++
      if (t <= count) {
        let len = easeIn(null, t, position, length, count)
        excu((s = len - preLen))
        preLen = len
        that.stopId = requestAnimationFrame(run, interval)
      } else {
        let {stopLength} = that
        if (stopLength !== undefined) {
          that.stopStart(excu, s, stopLength(), complete)
        } else {
          excu(s)
          that.stopId = requestAnimationFrame(run, interval)
        }
      }
    }

    run()
  }

  // @param length 要走的长度
  stopStart (excu, speed, length, complete = () => {}) {
    let t = 0 // 当前起始次数
    let interval = 20 // 帧间隔
    let count = this.getOutTotal(speed, length) // 总次数
    let position = 0 // 起始位置

    let that = this

    let preLen = 0
    // let s = 0 // 速度值
    let {easeOut} = this

    function run () {
      t++
      let len = easeOut(null, t, position, length, count)
      // s += len - preLen
      // console.log(s)
      excu(len - preLen)
      preLen = len
      if (t < count) {
        that.stopId = requestAnimationFrame(run, interval)
      } else {
        // 最后一次
        that.isRun = false
        that.stopId = undefined
        complete()
      }
    }

    run()
  }

  // 终止动画
  stop (fn) {
    if (this.isRunStop) return
    this.isRunStop = true
    this.stopLength = fn
  }

  // 缓动类型：可进行更换
  easing (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  }

  // 减速度总次数
  getOutTotal (s, length) {
    let i = 1
    while (true) {
      i += 20
      let curr = this.easeOut(null, 1, 0, length, i)
      if (curr < s) {
        break
      } else if (i > 2000) {
        // 失败
        i = 0
        break
      }
    }
    return i
  }
}
