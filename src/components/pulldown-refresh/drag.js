import darg from '@/utils/corejs/drag/drag.js'
import autoprefix from '@/utils/corejs/css/autoprefix'
import Queue from '@/utils/corejs/queue/queue.js'
import transitionendOnce from '@/utils/corejs/animation/transitionend-once'
export default function Drag ({ elem, containerElem, maxY, loadingY, onChange, onReload, transitionActive }) {
  let states = 0 // 0 未开始 1 已开始，但不满足 2 满足 3 加载中 4 加载完成
  let eStyle = elem.style
  let transform = autoprefix('transform')
  let currY = 0
  let preY
  let prePageY
  let dargStart = false
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
        setCss(y)
        transitionendOnce(elem, function () {
          classList.remove(transitionActive)
          isRun = false
          complete()
          next()
        })
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

  let scrollTop
  let scrollTopSet
  if (containerElem === window) {
    scrollTop = function () {
      return window.pageYOffset
    }
    scrollTopSet = function (y) {
      window.scrollTo(0, y)
    }
  } else {
    scrollTop = function () {
      return containerElem.scrollTop
    }
    scrollTopSet = function (y) {
      containerElem.scrollTop = y
    }
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
        // dargStart = false // move 中判断用，衔接更平滑
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
    onStart (e) {
      let touche = e.touches ? e.touches[0] : e
      prePageY = touche.pageY
      dargStart = true
      preY = currY
    },
    onMove (e) {
      if (isRun) return false
      let touche = e.touches ? e.touches[0] : e
      let { pageY } = touche
      // require('@/utils/debug-msg/w.js').default.show(scrollTop())
      if (scrollTop() > 0) {
        prePageY = pageY
        return
      }
      // 在 move 中判断开始。是为了加载中情况触发拖动，衔接更平滑，后来问题大于好处，所以弃用。问题见下
      // if (!dargStart) {
      //   // require('@/utils/debug-msg/w.js').default.show('start')
      //   dargStart = true
      //   prePageY = pageY
      //   preY = currY
      //   // 本来可以不加，但android 一些老的浏览器不支持。qq 内置的浏览器也不行
      //   // ios 中加了直接再在触发滚动了，更坑
      //   // 自带：Mozilla/5.0 (Linux; Android 4.4.4; C6603 Build/10.5.1.A.0.283) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 MxBrowser/4.4.2.1000
      //   // qq：Mozilla/5.0 (Linux; Android 4.4.4; C6603 Build/10.5.1.A.0.283; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044606 Mobile Safari/537.36 V1_AND_SQ_7.9.9_1010_YYB_D QQ/7.9.9.3965 NetType/WIFI WebP/0.3.0 Pixel/1080 StatusBarHeight/75
      //   e.preventDefault()
      //   return
      // }

      let y = pageY - prePageY

      if (y < 0) {
        y = 0
      } else if (e.cancelable) {
        e.preventDefault()
      }

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
      // 初始状态才允许手动刷新
      // if (states === 0) {
      //   scrollTopSet(0)
      //   startLoading()
      // }

      // 现在改为 什么时候都能手动刷新
      scrollTopSet(0)
      startLoading()
    },
    unbind () {
      unbindDrag()
    }
  }
}
