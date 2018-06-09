import drag from './drag'

/**
 * @param {function} onDown 可选 可在此处终止滑动开始
 * @param {function} onStart 可选
 * @param {function} onEnd 可选
 * @param {function} onMove
 * @param {function} onSwipeLeft 左滑，显示右边
 * @param {function} onSwipeRight 右滑，显示左边
 * @param {function} onSwipeNot 有移动，但没有切换
 */

export default function swipex ({elem, onDown = () => {}, onStart = () => {}, onEnd = () => {}, onMove, onSwipeLeft, onSwipeRight, onSwipeNot}) {
  let preX
  let preY
  let preTime
  let xData = []
  let isStart = false
  let isCancel = false // 触发其他行为情况，比如滚动条

  drag({
    elem,
    onDown (e) {
      // 保证滑动动作只激活此一个实例
      e.stopPropagation()
      return onDown(e)
    },
    onStart: function (e) {
      if (isCancel) return false
      let touche = e.targetTouches ? e.targetTouches[0] : e
      let {pageX, pageY} = touche
      preX = pageX
      preY = pageY
      preTime = Date.now()
    },
    onMove: function (e) {
      // 保证滑动动作只激活此一个实例
      e.stopPropagation()

      if (isCancel) return

      let touche = e.targetTouches ? e.targetTouches[0] : e
      let {pageX, pageY} = touche

      let currX = pageX
      let currY = pageY

      let xlen = currX - preX
      let ylen = currY - preY

      if (isStart === false) {
        // 手势相对于x轴 小于 45 度情况滑动才开始
        // window.dlog(Math.atan(ylen / xlen), ylen / xlen, 'y:' + ylen, 'x:' + xlen)
        // if (Math.abs(Math.atan(ylen / xlen)) < 1) {
        if (Math.abs(ylen / xlen) < 1) {
          isStart = true
          onStart(e)
        } else {
          isCancel = true
        }
        // 调试，微调弧度值，直到最精确
        // debugMsg(Math.abs(Math.atan(ylen / xlen)) + ' ' + (Math.abs(Math.atan(ylen / xlen)) < 1.2) + '  ' + isStart);
      }

      if (isStart) {
        e.preventDefault()

        let curTime = Date.now()
        let timeLen = curTime - preTime

        xData.push([xlen, timeLen])
        onMove(xlen)
        preX = currX
        preY = currY
        preTime = curTime
      }
    },
    onEnd: function () {
      if (isStart) {
        xData.push([0, Date.now() - preTime])

        let x = 0
        let time = 0
        for (let i = xData.length, j = 0; i--;) {
          let d = xData[i]
          x += d[0]
          time += d[1]
          if (j >= 2) {
            break
          }
          j++
        }
        let speed = x / time
        let min = 0.15
        if (speed > min) {
          onSwipeRight()
        } else if (speed < -min) {
          onSwipeLeft()
        } else {
          onSwipeNot()
        }
        xData = []
        onEnd()
        /* test */
        // info.innerHTML = speed * 100
      }
      isCancel = isStart = false
    }
  })
}
