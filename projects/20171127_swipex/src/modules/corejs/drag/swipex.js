import dragMobile from './drag-mobile'
import drag from './drag'

export default function swipex ({elem, onDown, onStart, onMove, onEnd, swipeLeft, swipeRight, swipeNot}) {
  let preX
  let preY
  let preTime
  let xData = []
  let isStart = false
  let isCancel = false // 触发其他行为情况，比如滚动条
  let options = {
    elem,
    onMove: function (e) {
      // 保证滑动动作只激活此一个实例
      e.stopPropagation()

      if (isCancel) return

      let touche = e.touches ? e.touches[0] : e
      let {pageX, pageY} = touche

      let currX = pageX
      let currY = pageY

      let xlen = currX - preX
      let ylen = currY - preY

      if (isStart === false) {
        // 手势相对于x轴 小于 57 度情况滑动才开始。1位弧度值
        // xlen为0，即除数为0，此时是90度，Math.atan是否支持，测试结果 Math.atan(1 / 0)*180/Math.PI => 90 。说明Math.atan支持
        if (Math.abs(Math.atan(ylen / xlen)) < 1) {
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
    onDown (e) {
      // 保证滑动动作只激活此一个实例
      e.stopPropagation()
      return onDown(e)
    },
    onStart: function (e) {
      if (isCancel) return false
      let touche = e.touches ? e.touches[0] : e
      let {pageX, pageY} = touche
      preX = pageX
      preY = pageY
      preTime = Date.now()
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
          swipeRight()
        } else if (speed < -min) {
          swipeLeft()
        } else {
          swipeNot()
        }
        xData = []
        onEnd()
        /* eslint-disable */
        // info.innerHTML = speed * 100
      }
      isCancel = isStart = false
    }
  }
  drag(options)
  dragMobile(options)
}
