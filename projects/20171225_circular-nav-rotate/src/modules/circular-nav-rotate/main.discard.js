/* eslint-disable */

/**
 * 关于惯性实现，直接根据角度值计算即可
 */
import drag from '@/utils/corejs/dom-drag/drag.js'
// import InertiaAnime from '../corejs/animation/inertia-anime'
const PI = Math.PI
export default class {
  init ({el, itemNum, num, each, hidden, r}) {
    let cx = window.innerWidth
    let cy = window.innerHeight
    let startAngle
    let preAngle
    let currAngle = 0
    let startIndex = 0
    let itemAngle = PI / 2 / (num + 1)
    let maxAngle = (num - itemNum) * itemAngle
    let move = ang => {
      let itemsPosition = this.itemsPositionCompute(ang, itemAngle, num, r)
      itemsPosition.forEach((xy, i) => {
        each(i - startIndex, xy)
      })
      hidden(-1 - startIndex)
      hidden(itemsPosition.length - startIndex)
    }

    drag({
      elem: el,
      onMove: (e) => {
        let touche = e.touches ? e.touches[0] : e
        let {pageX, pageY} = touche
        let angle = Math.atan2(cx - pageX,cy - pageY)
        currAngle = startAngle - angle + preAngle
        startIndex = ~~(currAngle / itemAngle)
        if (currAngle < maxAngle) {
          currAngle = maxAngle
          startIndex = 0 - itemNum + num
          console.log(startIndex)
        } else if (currAngle > 0) {
          startIndex = currAngle = 0
        }
        move(currAngle)
      },
      onStart: (e) => {
        e.preventDefault()
        let touche = e.touches ? e.touches[0] : e
        let {pageX, pageY} = touche
        startAngle = Math.atan2(cx - pageX, cy - pageY)
        preAngle = currAngle
      }
    })

    move(0)
  }
  // toAng (v) {
  //   return v * 180 / PI
  // }

  itemsPositionCompute (start, itemAngle, num, r) {
    // let r = 290
    let d = []
    // let start = 10
    start = start % itemAngle
    for (let i = 1, len = num + 2; i < len; i++) {
      let  angle = i * itemAngle + start
      d.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r
      })
    }
    return d
  }

}
