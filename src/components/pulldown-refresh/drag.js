import darg from '@/modules/corejs/drag/drag.js'
import autoPrefix from '@/modules/corejs/css/autoprefix'
import Queue from '@/modules/corejs/queue/queue'
import transitionendOnce from '@/modules/corejs/animation/transitionend-once'
export default function Drag ({ elem, maxY, loadingY, onChange, onReload, transitionActive }) {
  let states = 0 // 0 未开始 1 已开始，但不满足 2 满足 3 加载中 4 加载完成
  let eStyle = elem.style
  let transform = autoPrefix('transform')
  let currY = 0
  let preY
  let prePageY
  let dargStart = false // 在 move 中判断开始。好处更多
  let isRun = false
  let queue = new Queue()

  function setCss (y) {
    // eStyle[transform] = 'translateY(' + y + 'px)'
    eStyle[transform] = y === 0 ? 'none' : 'translateY(' + y + 'px)'
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
        classList.add(transitionActive)
        setTimeout(() => {
          setCss(y)
          transitionendOnce(elem, function () {
            classList.remove(transitionActive)
            isRun = false
            complete()
            next()
          })
        }, 1)
        currY = y
      }
    })
  }

  function statesUpdate () {
    if (states > 2) return
    if (currY === 0) {
      onChange(states = 0)
    } else if (currY < maxY) {
      onChange(states = 1)
    } else {
      onChange(states = 2)
    }
  }

  let scrollTop = function () {
    return window.pageYOffset
  }

  function startLoading () {
    // 切换到加载中状态
    onChange(states = 3)
    // 动画到加载位置
    animate(loadingY)
    // 执行加载
    onReload().then(function () {
      // 加载完成
      onChange(states = 4)
      // 拖动情况不归0
      if (dargStart) {
        animate(loadingY)
        dargStart = false
        return
      }
      // 归0
      animate(0, () => {
        onChange(states = 0)
      })
    })
  }
  let unbindDrag = darg({
    elem,
    onDown () {
      if (isRun) return false
    },
    // onStart (e) {
    //   let touche = e.touches ? e.touches[0] : e
    //   prePageY = touche.pageY
    // },
    onMove (e) {
      if (isRun) return false
      if (scrollTop() !== 0) return
      let touche = e.touches ? e.touches[0] : e
      let { pageY } = touche
      if (!dargStart) {
        dargStart = true
        prePageY = pageY
        preY = currY
        return
      }

      let y = pageY - prePageY

      if (y < 0) y = 0
      else e.preventDefault()

      currY = (y * 100 / (100 + currY)) + preY // 加阻力
      setCss(currY)
      statesUpdate()
    },
    onEnd () {
      dargStart = false
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

  return {
    refresh () {
      if (states === 0) {
        startLoading()
      }
    },
    unbind () {
      unbindDrag()
    }
  }
}
