export default class Animation {
  // params: 反复执行的函数，动画持续时间(毫秒)，到达目标位置时回调
  start (excu, duration = 400, complete = () => {}) {
    let t = 0 // 当前起始次数
    let interval = 60 // 帧间隔
    let count = duration / interval // 总次数
    let position = 0 // 起始位置
    // let endPosition = 1 // 目标位置
    let length = 1 // 要走的总长度

    let that = this

    function run () {
      t++
      if (t < count) {
        excu(that.easing(null, t, position, length, count))
        run()
        // that.stopId = setTimeout(run, interval)
      } else {
        // 最后一次
        excu(1)

        that.stopId = undefined

        complete()
      }
    }

    run()
  }

  // 终止动画
  stop () {
    clearTimeout(this.stopId)
  }

  // 缓动类型：可进行更换
  easing (x, t, b, c, d) {
    // easeOutQuad
    // return -c * (t /= d) * (t - 2) + b
    // easeOutExpo
    // return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b
  }
}
