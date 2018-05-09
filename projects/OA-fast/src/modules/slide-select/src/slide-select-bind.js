import './modules/comm'
import autoprefix from './modules/autoprefix'
import drag from './modules/drag-mobile'
import InertiaAnime from './modules/inertia-anime'
import Animation from './modules/animation'

import Swipe from './modules/swipe'

let transform = autoprefix('transform')[1]

export default class {
  constructor ({ eDrag, eMove, onChange = () => {} } = {}) {
    this.eDrag = eDrag
    this.eMove = eMove

    let itemH = this.itemH = 30// 项高
    let count = this.count = eMove.children.length
    let contH = itemH * count
    this.minH = itemH - contH

    this.currIndex = 0
    this.currX = 0
    this.direction = 0// 0 反方向(向左上)，1 正方向(向右下)

    // this.isLoad = false // loading 过程中将无法进行动作

    this.onChange = onChange

    this.init()
  }

  init () {
    let {eDrag} = this

    let swipeBase = new Swipe()
    let animation = this.animation = new Animation()

    let inertiaAnime = new InertiaAnime({
      move: (v) => {
        if (v > 60) {
          v = 60
          inertiaAnime.stop()
          this.recover(v)
        } else if (v < this.minH - 60) {
          v = this.minH - 60
          inertiaAnime.stop()
          this.recover(v)
        } else {
          this.elmMove(v)
        }
        this.currX = v
      },
      complete: () => {
        this.recover(this.currX)
      }
    })

    let startX
    let tempX
    drag({
      eDrag,
      onDown: () => {
        return this.count > 0
      },
      onStart: e => {
        e.stopPropagation()

        inertiaAnime.stop()
        animation.stop()

        startX = e.touches[0].pageY

        tempX = this.currX

        swipeBase.start(startX)
      },
      onMove: e => {
        e.preventDefault()

        let moveX = e.touches[0].pageY

        let lenx = moveX - startX
        if (lenx > 0) {
          this.direction = 1
        } else {
          this.direction = 0
        }

        let currX = lenx + tempX

        swipeBase.move(moveX)

        this.elmMove(this.currX = currX)
      },
      onEnd: () => {
        swipeBase.end((r) => {
          let v = r * 60
          let currX = inertiaAnime.cur = this.currX
          inertiaAnime.start(currX + v)
        }, () => {
          this.recover(this.currX)
        })
      }
    })
  }

  elmMove (y) {
    this.eMove.style[transform] = 'translate3d(0,' + y + 'px,0)'
  }

  // 选择结果
  result (y) {
    let {itemH, currIndex} = this
    let index = (-y + '') / itemH
    if (index !== currIndex) {
      this.onChange(this.currIndex = index)
    }
  }

  select (index) {
    this.currIndex = index
    this.elmMove(this.currX = -index * this.itemH)
  }

  recover (y) {
    let {minH, itemH: h} = this
    let t
    if (y > 0) {
      t = 0
    } else if (y < minH) {
      t = minH
    } else {
      t = y % h
      if (t < -h / 2) {
        t = t - (h + t) + (y - t)
      } else {
        t = y - t
      }
    }

    this.result(t)
    let len = t - y
    if (len === 0) return
    this.animation.start(p => {
      let currX = this.currX = y + len * p
      this.elmMove(currX)
    }, 100)
  }

  update () {
    let {itemH, eMove, currIndex} = this
    let count = this.count = eMove.children.length
    let contH = itemH * count
    this.minH = itemH - contH

    this.recover(-itemH * currIndex)
  }
}
