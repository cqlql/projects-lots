import Animation from './animation'
import autoPrefix from '../../modules/corejs/dom/css/autoprefix'

let transform = autoPrefix('transform')[1]
export default class {
  init ({el, complete, count = 6, offsetDeg = 0}) {
    this.animation = new Animation()

    this.deg = 0
    this.targetDeg = 0
    this.result = 0// 是否返回结果

    this.isRun = false
    // 此处参数可能会根据实际情况有所调整
    this.count = count// 盘数
    this.pieDeg = 100
    // 最大的角度
    this.maxDeg = count * this.pieDeg
    this.maxSpeed = 16// 最高速度，单位deg
    this.time = 1000

    // 偏差角度，转盘图片所致
    this.offsetDeg = offsetDeg

    this.rotate = function (deg) {
      el.style[transform] = 'translateX(-' + deg + '%)'
    }
    this.complete = complete
  }
  start () {
    if (this.isRun) {
      return
    }
    this.isRun = true
    this.result = 0

    let dp// 减速比例。强行衔接最高加速

    this.animation.start(
      p => {
        this.deg = (this.deg + this.maxSpeed * p) % this.maxDeg

        this.rotate(this.deg)

        if (this.result && p === 1) {
          dp = this.deg / this.targetDeg
          return 1
        }
      },
      p => {
        this.deg = ((dp + (1 - dp) * p) * this.targetDeg) % this.maxDeg

        this.rotate(this.deg)

        if (p === 1) {
          return 2
        }
      },
      this.time,
      () => {
        this.isRun = false
        this.complete()
      }
    )
  }
  stop (t) {
    this.result = 1
    this.targetDeg = t * this.pieDeg + this.offsetDeg + this.maxDeg * 1
  }
  rotate () {}
  complete () {}
}
