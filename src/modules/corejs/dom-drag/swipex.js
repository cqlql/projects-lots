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

export default function swipex ({ elem, onDown = () => {}, onStart = () => {}, onEnd = () => {}, onMove, onSwipeLeft, onSwipeRight, onSwipeNot }) {
  let preX
  let preY
  let preTime
  let xData = []
  let isStart = false
  let isCancel = false // 触发其他行为情况，比如滚动条

  drag({
    elem,
    onDown (e) {
      // 保证滑动动作只激活当前一个实例--弃用，确保灵活性，尽量不在此处控制
      // e.stopPropagation()
      return onDown(e)
    },
    onStart: function (e) {
      if (isCancel) return false
      let touche = e.targetTouches ? e.targetTouches[0] : e
      let { pageX, pageY } = touche
      preX = pageX
      preY = pageY
      preTime = Date.now()
    },
    onMove: function (e) {
      // 保证滑动动作只激活当前一个实例
      e.stopPropagation()

      if (isCancel) return

      let touche = e.targetTouches ? e.targetTouches[0] : e
      let { pageX, pageY } = touche

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
      }

      if (isStart) {
        e.preventDefault()

        let curTime = Date.now()
        let timeLen = curTime - preTime
        // elem.innerHTML = `<p>move,${timeLen},${xlen.toFixed(2) * 1}</p>` + elem.innerHTML

        xData.push([xlen, timeLen])
        onMove(xlen, e)
        preX = currX
        preY = currY
        preTime = curTime
      }
    },
    onEnd: function () {
      if (isStart) {
        xData.push([0, Date.now() - preTime, 'end'])
        // console.log(JSON.stringify(xData))

        let x = 0
        let time = 0
        for (let i = xData.length, j = 0; i--;) {
          let d = xData[i]
          let t = d[1]
          // 时间间隔低于 50ms，保证不能超过 5 个成员叠加
          if (t > 50 || j++ > 5) {
            break
          }
          x += d[0]
          time += t
        }
        let speed = x / time || 0
        let min = 0.15
        /* test */
        // elem.innerHTML = `<p>${speed.toFixed(2)},${x},${time},${JSON.stringify(xData)}</p>` + elem.innerHTML
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
        // elem.innerHTML = speed * 100
      }
      isCancel = isStart = false
    }
  })
}
