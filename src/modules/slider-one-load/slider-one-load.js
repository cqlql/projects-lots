import swipePlus from '../corejs/drag/swipex'
import autoPrefix from '../corejs/dom/css/autoprefix'
import transitionendOnce from '../corejs/animation/transitionend-once'
import SliderPositionData from './slider-position-data'

let transform = autoPrefix('transform')[1]

export default class {
  constructor ({eDrag, boxW, totalPage}) {
    this.isRun = false // 是否动画中

    this.pageIndex = 0 // 当前页面
    this.totalPage = totalPage // 总页数
    this.noPage = totalPage === undefined // 是否翻页限制

    // 拖动情况 松开时 是否进行滑动的最大偏移值
    let offset = boxW / 3
    this.moveLength = 0// 当前拖动的长度
    this.boxW = boxW

    this.eMove = eDrag.children[0]
    this.eItems = this.eMove.children

    this.sliderPositionData = new SliderPositionData()

    swipePlus({
      elem: eDrag,
      swipeLeft: () => {
        this.onSwipeLeft()
      },
      swipeRight: () => {
        this.onSwipeRight()
      },
      swipeNot: () => {
        let {moveLength} = this

        // 未发生，但有移动

        // 超过一般情况 滑动
        if (Math.abs(moveLength) > offset) {
          if (moveLength > 0) {
            this.onSwipeRight()
          } else {
            this.onSwipeLeft()
          }
        } else {
          // 未发生切换，还原
          this.swipeNot()
        }
      },
      onDown: e => {
        // 可阻止拖动触发
        if (this.isRun) {
          e.preventDefault()
          return false
        }
      },
      onStart: e => {

      },
      onMove: (toX) => {
        this.moveLength += toX

        this.move(this.moveLength - this.boxW)
      },
      // 将会先执行 swipeLeft swipeRight 再执行onEnd
      onEnd: () => {
        this.moveLength = 0
      }
    })
  }
  move (x) {
    this.eMove.style[transform] = 'translate3d(' + x + 'px,0,0)'
  }

  // 向左滑动，向左移动
  // type, 自定义类型，可区别非事件触发情况
  swipeLeft () {
    // if (this.isRun) return
    if (this.noPage) {
      this.$swipeLeft()
      return true
    }
    let {pageIndex, totalPage, moveLength} = this
    pageIndex = pageIndex + 1
    if (pageIndex < totalPage) {
      this.pageIndex = pageIndex
      this.$swipeLeft()
      return true
    } else if (moveLength) {
      this.swipeNot()
    }
  }
  // 向右滑动，向右移动
  swipeRight () {
    // if (this.isRun) return
    if (this.noPage) {
      this.$swipeRight()
      return true
    }
    let {pageIndex, moveLength} = this
    pageIndex = pageIndex - 1
    if (pageIndex > -1) {
      this.pageIndex = pageIndex
      this.$swipeRight()
      return true
    } else if (moveLength) {
      this.swipeNot()
    }
  }
  // 一定滑动
  $swipeLeft () {
    this.animateActive(() => {
      this.adjust()
    })
    this.sliderPositionData.swipeLeft()
    this.eMove.style[transform] = 'translate3d(-200%,0,0)'
  }
  $swipeRight () {
    this.animateActive(() => {
      this.adjust()
    })
    this.sliderPositionData.swipeRight()
    this.eMove.style[transform] = 'translate3d(0,0,0)'
  }
  swipeNot () {
    this.animateActive()
    this.eMove.style[transform] = 'translate3d(-100%,0,0)'
  }

  onSwipeLeft () {
    if (this.swipeLeft()) {
      this.onChange()
    }
    // this.onChangeLeft()
  }
  onSwipeRight () {
    if (this.swipeRight()) {
      this.onChange()
    }
    // this.onChangeRight()
  }

  animateActive (cb) {
    let {eMove} = this
    let {classList} = eMove
    this.isRun = true
    classList.add('animated')
    transitionendOnce(eMove, () => {
      classList.remove('animated')
      cb && cb()
      this.isRun = false
    })
  }
  // 调整归位
  adjust () {
    let {eMove, eItems, sliderPositionData} = this
    let {data} = sliderPositionData

    eMove.style[transform] = 'translate3d(-100%,0,0)'
    data.forEach((d, i) => {
      eItems[d.item].style[transform] = `translate3d(${i * 100}%,0,0)`
    })
    this.onChangeAnimateEnd()
    // onChange && onChange(data, direct, type)
  }

  onChange () {}
  // onChangeLeft () {}
  // onChangeRight () {}
  onChangeAnimateEnd () {}
}
