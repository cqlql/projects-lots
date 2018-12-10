/**
 * Banner
 * Created by cql on 2017/4/30.
 */

import autoPrefix from '../corejs/dom/css/autoprefix'
import click from '../corejs/dom/click'
import scopeElements from '../corejs/dom/scope-elements'
import swipe from '../corejs/drag/swipex'
import Timer from '../corejs/time/timer'
import transitionendOnce from '../corejs/dom/css/transitionend-once'

let transform = autoPrefix('transform')[1]

/**
 * 无掉头
 * */
export default class Banner {
  init ({
    eBox,
    // 切换后，并且动画完成后回调
    onComplete = function () {},
    // 加载图片
    onLoadImg = function (eItem) {
      // 按需加载
      if (!eItem._data_isComplete) {
        let img = eItem.children[0]
        let imgUrl = img.dataset.src
        if (imgUrl) img.src = imgUrl
        eItem._data_isComplete = 1
      }
    },
    timerInterval = 3000 // 0 情况表示没有定时器
  }) {
    this.eBox = eBox
    let eMove = this.eMove = eBox.children[0]
    let eItems = this.eItems = eMove.children
    let count = this.count = eItems.length
    this.fakeCount = count + 2
    this.currFakeIndex = 0

    let eBtnBox = this.eBtnBox = eBox.children[1]
    this.eBtns = eBtnBox.children

    this.onComplete = onComplete
    this.onLoadImg = onLoadImg

    if (count > 1) this.build()

    this.swipeDisable = count < 2 // 是否允许滑动
    this.slide(timerInterval)

    if (count > 1) {
      // 初始到第一张
      this.directLoad(1)
      // 开启定时器
      this.timer.start()
    }

    this.btnClickHandle()
  }
  // 头尾增加 li，不掉头 html实现
  build () {
    let {eMove, eItems, count, fakeCount} = this
    let btnHtml = ''
    // 头尾增加 li，不掉头 html实现
    eMove.innerHTML = eItems[count - 1].outerHTML + eMove.innerHTML + eItems[0].outerHTML

    for (let i = 0; i < fakeCount; i++) {
      // 初始化项的位置
      eItems[i].style[transform] = 'translateX(' + (i * 100) + '%)'

      // 拼接按钮
      if (i < count) btnHtml += '<li data-index="' + i + '" ' + (i ? '' : ' class="active"') + '><b></b></li>'
    }
    this.eBtnBox.innerHTML = btnHtml
  }

  slide (timerInterval) {
    let {eBox} = this
    let timer
    if (timerInterval) {
      timer = this.timer = new Timer({
        time: timerInterval,
        callBack: () => {
          this.swipeLeft()
        }
      })
    } else {
      timer = this.timer = {
        start () {},
        stop () {}
      }
    }
    let boxW = this.boxW = eBox.clientWidth

    // 拖动的长度
    this.moveLength = 0

    // 拖动情况 松开时 是否进行滑动的最大偏移值
    let offset = boxW / 3

    // this.isRun = false // 是否动画进行中

    // let isChange = false // 是否有更改

    swipe({
      elem: eBox,
      swipeLeft: () => { this.swipeLeft() },
      swipeRight: () => { this.swipeRight() },
      swipeNot: () => {
        let {moveLength} = this
        // 未发生，但有移动;

        // 超过一般情况 滑动
        if (Math.abs(moveLength) > offset) {
          if (moveLength > 0) {
            this.swipeRight()
          } else {
            this.swipeLeft()
          }
        } else {
          // 复位
          this.swipeNot()
        }
      },
      onDown: () => {
        // 阻止拖动触发
        if (this.isRun || this.swipeDisable) return false
      },
      onStart () {
        timer.stop()
      },
      onMove: (toX) => {
        let moveLength = this.moveLength = this.moveLength + toX
        this.move((-this.currFakeIndex * boxW) + moveLength)
      },
      onEnd () {
        timer.start()
      }
    })
  }
  // 向左滑动，向左移动
  // type, 自定义类型，可区别非事件触发情况
  swipeLeft () {
    let i = this.currFakeIndex
    i++
    this.change(i)
    this.animateActive()
    this.move(-i * this.boxW)
  }
  // 向右滑动，向右移动
  swipeRight () {
    let i = this.currFakeIndex
    i--
    this.change(i)
    this.animateActive()
    this.move(-i * this.boxW)
  }
  swipeNot () {
    this.animateActive()
    this.move(-this.currFakeIndex * this.boxW)
  }
  swipeGo (i) {
    if (i !== this.currFakeIndex) {
      this.change(i)
      this.animateActive()
      this.move(-i * this.boxW)
    }
  }
  animateActive () {
    let {eMove} = this
    let {classList} = eMove
    this.isRun = true
    classList.add('animated')
    transitionendOnce(eMove, () => {
      classList.remove('animated')
      this.adjust()
      this.isRun = false
    })
  }
  move (x) {
    this.eMove.style[transform] = 'translate3d(' + x + 'px,0,0)'
  }
  change (i) {
    this.isChange = true
    this.changeBtn(i)
    this.loadImg(i)

    this.currFakeIndex = i
  }
  adjust () {
    let {currFakeIndex, count, boxW} = this
    this.moveLength = 0

    if (this.isChange) {
      if (currFakeIndex > count) {
        // 第一个情况
        this.loadImg(1)
        this.move(-boxW)
        this.currFakeIndex = 1
      } else if (currFakeIndex === 0) {
        // 最后一个情况
        this.loadImg(count)
        this.move(-boxW * count)
        this.currFakeIndex = count
      }

      this.onComplete()

      this.isChange = false
    }
  }
  loadImg (i) {
    // let eItem = eItems[i];
    // // 按需加载
    // if (!eItem._data_isComplete) {
    //     let img = eItem.children[0],
    //         imgUrl = img.dataset.src;
    //     if (imgUrl) img.src = imgUrl;
    //     eItem._data_isComplete = 1;
    // }

    this.onLoadImg(this.eItems[i], i)
  }
  changeBtn (i) {
    let {eBtns, currFakeIndex} = this
    eBtns[this.getRealIndex(currFakeIndex)].classList.remove('active')
    eBtns[this.getRealIndex(i)].classList.add('active')
  }
  // 真实索引
  getRealIndex (fakeIndex) {
    let {count, fakeCount} = this
    if (fakeIndex > fakeCount - 2) {
      // 第一个情况

      return 0
    }
    if (fakeIndex === 0) {
      // 最后一个情况
      return count - 1
    }

    return fakeIndex - 1
  }
  // 直接加载切换，不动画，不触发change。初始时可用
  directLoad (i) {
    this.changeBtn(i)
    this.loadImg(i)
    this.move(-i * this.boxW)
    this.currFakeIndex = i
  }
  // 销毁
  destroy () {
    this.timer.stop()
  }
  // 项更换情况重置
  update () {
    let {timer} = this
    timer.stop()
    let count = this.count = this.eItems.length
    if (count > 1) {
      this.swipeDisable = false
      this.fakeCount = count + 2
      this.currFakeIndex = 0
      this.build()
      this.directLoad(1)
      timer.start()
    } else {
      this.swipeDisable = true
      this.eBtnBox.innerHTML = ''
      this.move(0)
    }
  }
  btnClickHandle () {
    let {eBtnBox} = this
    click(eBtnBox, (e) => {
      scopeElements(e.target, elem => {
        if (elem === eBtnBox) return false
        if (elem.tagName === 'LI') {
          let {index} = elem.dataset
          this.swipeGo(index * 1 + 1)
          return false
        }
      })
    })
  }
}
