import '../../modules/corejs/common'
export default class Animation {
  // // 加速缓动
  // aeasing (x, t, b, c, d) {
  //   return c * ((t = t / d - 1) * t * t + 1) + b
  // }
  // // 减速缓动
  // deasing (x, t, b, c, d) {
  //   return -c * (t /= d) * (t - 2) + b
  // }

  // params: 反复执行的函数，动画持续时间(毫秒)，到达目标位置时回调
  start (excu, rExcu, duration = 400, complete = () => {}) {
    let t = 0 // 当前起始次数
    let interval = 20 // 帧间隔
    let count = duration / interval // 总次数

    let position = 0 // 起始位置
    let endPosition = 100 // 目标位置
    let length = endPosition - position // 要走的总长度

    let that = this

    // 切换到加速
    // this.easing = this.aeasing

    function run () {
      t++

      if (t >= count) {
        t = count
      }

      let on = true
      switch (excu(that.easing(null, t, position, length, count) / endPosition)) {
        case 1:
          t = 0
          // count = count * 3
          excu = rExcu
          // 切换到减速
          // that.easing = that.deasing
          break

        case 2:
          on = false
          complete()
          break
      }

      if (on) that.stopId = requestAnimationFrame(run, interval)
    }

    run()
  }

  // 终止动画
  stop () {
    cancelAnimationFrame(this.stopId)
  }

  // 缓动类型：可进行更换
  easing (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  }
}
