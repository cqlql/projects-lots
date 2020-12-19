import '../common'

export default class {
  constructor ({move = () => {}, rate = 0.2, complete = () => {}}) {
    this.rate = rate
    this.move = move

    // 开关。 是否进行中。true 进行中
    this.sw = false

    this.cur = 0

    this.complete = complete
  }

  start (to, cur = this.cur) {
    let {move} = this

    this.to = to
    this.cur = cur

    if (this.sw) return
    this.sw = true

    let excu = () => {
      if (this.sw) {
        let {to, cur, rate} = this

        this.cur = cur = cur + rate * (to - cur)

        // 最后一次
        if (Math.abs(to - cur) < 1) {
          this.cur = to
          this.sw = false
          this.complete()
        }

        move(cur)

        this.stopId = window.requestAnimationFrame(excu)
      }
    }
    excu()
  }

  stop () {
    this.sw = false
    window.cancelAnimationFrame(this.stopId)
  }
}
