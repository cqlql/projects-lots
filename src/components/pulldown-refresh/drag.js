import darg from '@/modules/corejs/dom-drag/drag'
import autoPrefix from '@/modules/corejs/dom-css/autoprefix'
import Queue from '@/modules/corejs/queue'
import transitionendOnce from '@/modules/corejs/animation/transitionend-once'
let transform = autoPrefix('transform')
export default class {
  constructor ({ elem, elemDrag, maxY, loadingY, onChange, onReload }) {
    let states = 0 // 0 未开始 1 已开始，但不满足 2 满足 3 加载中 4 加载完成
    // 进入状态 3 后，再无法拖动改变状态，直到加载完成，并到达状态 0

    let transitionActiveClassName = 'transition-active'

    let queue = new Queue()
    let eStyle = elem.style
    function elemSetCssY (y) {
      eStyle[transform] = 'translateY(' + y + 'px)'
    }
    function clearTransform () {
      eStyle[transform] = 'none'
    }

    // 状态识别
    function stateDiscern (y) {
      if (states > 2) return
      if (y === 0) {
        onChange(states = 0)
      } else if (y < maxY) {
        onChange(states = 1)
      } else {
        onChange(states = 2)
      }
    }

    function animate (y, complete = () => {}) {
      queue.excu(next => {
        isRun = true
        if (currY === y) {
          isRun = false
          complete()
          next()
        } else {
          let { classList } = elem
          classList.add(transitionActiveClassName)
          elemSetCssY(y)
          transitionendOnce(elem, function () {
            classList.remove(transitionActiveClassName)
            isRun = false
            complete()
            next()
            // 清掉 transform。解决 fiexd 一些问题
            if (y === 0) {
              clearTransform()
            }
          })
          currY = y
        }
      })
    }

    let isDrag // 记录拖动是否开始
    let isRun
    let prePageY
    let currY = 0 // 当前位置
    let unbindDrag = darg({
      elem: elemDrag || elem,
      onMove (e) {
        if (isRun) return false // 考虑到归位动画，此时却在拖动状态
        let touche = e.targetTouches ? e.targetTouches[0] : e
        let { pageY } = touche
        let ylen = pageY - prePageY

        currY += (ylen * 40 / (40 + currY))

        if (currY < 0) {
          currY = 0
          return
        }

        if (window.pageYOffset === 0 && currY) { // 刷新拖动情况
          e.preventDefault()
        } else { // 滚动情况归0
          currY = 0
        }

        if (currY === 0) { // 清掉 transform。解决 fiexd 一些问题
          clearTransform()
        } else {
          elemSetCssY(currY)
        }

        stateDiscern(currY)

        prePageY = pageY
      },
      onDown () {
        if (isRun) return false
      },
      onStart (e) {
        isDrag = true
        let touche = e.targetTouches ? e.targetTouches[0] : e
        let { pageY } = touche
        prePageY = pageY
      },
      onEnd () {
        isDrag = false
        switch (states) {
          case 1: case 4:
            animate(0, () => {
              onChange(states = 0)
            })
            break
          case 2:
            startLoading()
            break
          case 3:
            animate(loadingY)
            break
        }
      }
    })

    function startLoading () {
      // 切换到加载中状态
      onChange(states = 3)
      // 动画到加载位置
      animate(loadingY)
      // 执行加载
      onReload(function () {
        // 加载完成
        onChange(states = 4)
        if (isDrag) { // 拖动情况不归0
          animate(loadingY)
          return
        }
        // 归位
        // setTimeout(function () {// 这个加定时器版本忘记意义何在，以后确认记录
        //   animate(0, () => {
        //     onChange(states = 0)
        //   })
        // }, 400)
        animate(0, () => {
          onChange(states = 0)
        })
      })
    }

    // 直接从状态 0 进入加载状态
    this.refresh = function () {
      if (states === 0) {
        startLoading()
      }
    }
    // 解除事件绑定
    this.unbind = function () {
      unbindDrag()
    }
  }
}
