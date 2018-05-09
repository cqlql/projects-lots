import Animation from './animation'
import autoPrefix from '../corejs/dom/css/autoprefix'

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
    this.pieDeg = 360 / this.count
    // 最大的角度
    this.maxDeg = 360
    this.maxSpeed = 8// 最高速度，单位deg
    this.time = 1600

    // 偏差角度，转盘图片所致
    this.offsetDeg = offsetDeg

    this.rotate = function (deg) {
      el.style[transform] = 'rotate3d(0,0,1,' + deg + 'deg)'
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
        this.deg = (dp + (1 - dp) * p) * this.targetDeg

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
    this.targetDeg = t * this.pieDeg + this.offsetDeg + this.maxDeg * 2
  }
  rotate () {}
  complete () {}
}
