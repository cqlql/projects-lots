import darg from '../corejs/drag/drag'
import autoPrefix from '../corejs/dom/css/autoprefix'
import Queue from '../corejs/queue'
import transitionendOnce from '../corejs/animation/transitionend-once'
let transform = autoPrefix('transform')[1]
export default class {
  constructor ({ elem, elemDrag, maxY, loadingY, onChange, onReload }) {
    let states = 0 // 0 未开始 1 已开始，但不满足 2 满足 3 加载中 4 加载完成
    // 进入状态 3 后，再无法拖动改变状态，直到加载完成，并到达状态 0

    let transitionActiveClassName = 'transition-active'

    let queue = new Queue()
    function elemSetCssY (y) {
      elem.style[transform] = 'translateY(' + y + 'px)'
    }

    // 状态识别
    function stateDiscern (y) {
      if (states > 2) return
      if (y < maxY) {
        onChange(states = 1)
      } else {
        onChange(states = 2)
      }
    }

    function animate (y, complete = () => { }) {
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
        }

        if (window.pageYOffset === 0 && currY) { // 刷新拖动情况
          e.preventDefault()
        } else { // 滚动情况归0
          currY = 0
        }

        elemSetCssY(currY)

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
        setTimeout(function () {
          animate(0, () => {
            onChange(states = 0)
          })
        }, 400)
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
