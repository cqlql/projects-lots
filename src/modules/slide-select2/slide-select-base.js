import drag from '../corejs/drag/drag'
import autoPrefix from '../corejs/dom/css/autoprefix'
import InertiaAnime from '../corejs/animation/inertia-anime'
import Animation from '../corejs/animation/animation'
let transform = autoPrefix('transform')[1]
export default class {
  constructor ({eDrag, eMove, itemHeight, onChange}) {
    this.init(eDrag, eMove, itemHeight, onChange)
  }

  init (eDrag, eMove, itemHeight, onChange) {
    // let itemHeight = 0
    let minHeight = 0
    let itemTotal = 0
    let selectedIndex = 0 // 当前选择项

    function move (y) {
      eMove.style[transform] = 'translate3d(0,' + y + 'px,0)'
    }
    function inertiaAnimeStart (s) {
      inertiaAnime.rate = 0.2
      inertiaAnime.cur = currY
      inertiaAnime.start(currY + s * 200)
    }
    // animation 调整动画开始
    function result (sp, t) {
      let y = currY
      // 限制
      if (y > 0) {
        sp = y
        t = 0
      } else if (y < minHeight) {
        sp = y - minHeight
        t = itemTotal - 1
      }

      function cb () {
        if (t !== selectedIndex) {
          onChange(t)
          selectedIndex = t
        }
      }

      if (sp > 0.5 || sp < -0.5) {
        animation.start(p => {
          currY = y - sp * p
          move(currY)
        }, 100, cb)
      } else {
        cb()
      }
    }

    let animation = new Animation()

    let inertiaAnime = new InertiaAnime({
      // 惯性进行中
      move: (v) => {
        if (v > 0 || v < minHeight) {
          inertiaAnime.rate = 0.5
        }
        move(v)
        currY = v
      },
      complete: () => { // 惯性结束
        this.result(currY, itemHeight, result)
      }
    })

    let currY = 0// 当前位置

    this.swipey({
      elem: eDrag,
      onDown () {
        inertiaAnime.stop()
        animation.stop()
      },
      onMove (toY) {
        currY += toY
        move(currY)
      },
      onEnd () {},
      swipeTop: inertiaAnimeStart,
      swipeBottom: inertiaAnimeStart,
      swipeNot: () => {
        this.result(currY, itemHeight, result)
      }
    })

    this.update = function (total) {
      if (itemTotal === total) return
      itemTotal = total
      let contHeight = total * itemHeight
      minHeight = itemHeight - contHeight
      this.result(currY, itemHeight, result)
    }

    this.select = function (index) {
      if (index === selectedIndex) return
      selectedIndex = index
      currY = -index * itemHeight
      move(currY)
    }
  }

  /**
   * @param swipeNot 没有移动情况也会触发，即click情况
   * */
  swipey ({elem, onDown, onStart, onMove, onEnd, swipeBottom, swipeTop, swipeNot}) {
    // let preX
    let preY
    let preTime
    let yData = []
    let options = {
      elem,
      onMove: function (e) {
        e.preventDefault()

        let touche = e.touches ? e.touches[0] : e
        let {pageY} = touche

        // let currX = pageX
        let currY = pageY

        let ylen = currY - preY

        let curTime = Date.now()
        let timeLen = curTime - preTime

        yData.push([ylen, timeLen])
        onMove(ylen)
        // preX = currX
        preY = currY
        preTime = curTime
      },
      onDown (e) {
        // 保证滑动动作只激活此一个实例
        e.stopPropagation()
        return onDown(e)
      },
      onStart: function (e) {
        let touche = e.touches ? e.touches[0] : e
        let {pageY} = touche
        // preX = pageX
        preY = pageY
        preTime = Date.now()
      },
      onEnd: function () {
        yData.push([0, Date.now() - preTime])

        let y = 0
        let time = 0
        for (let i = yData.length, j = 0; i--;) {
          let d = yData[i]
          y += d[0]
          time += d[1]
          if (j >= 2) {
            break
          }
          j++
        }
        let speed = y / time
        let min = 0.15
        if (speed > min) {
          swipeBottom(speed)
        } else if (speed < -min) {
          swipeTop(speed)
        } else {
          swipeNot()
        }
        yData = []
        onEnd()
      }
    }
    drag(options)
  }

  // 计算结果，返回索引
  result (y, h, cb) {
    y = -y
    let t = ~~(y / h)
    let hf = h / 2
    let sp = y % h
    if (sp > hf) {
      t += 1
      sp = h - sp
    } else {
      sp = -sp
    }
    cb(sp, t)
  }
}
