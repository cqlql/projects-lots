import darg from '@/modules/corejs/drag/drag.js'
import autoPrefix from '@/modules/corejs/css/autoprefix'
export default class Drag {
  constructor ({ elem, maxY, onChange }) {
    let states = 0 // 0 未开始 1 已开始，但不满足 2 满足 3 加载中 4 加载完成
    let eStyle = elem.style
    let transform = autoPrefix('transform')
    let currY = 0
    let prePageY

    function setCss () {
      eStyle[transform] = 'translateY(' + currY + 'px)'
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

    darg({
      elem,
      onDown () {
        
      },
      onStart (e) {
        let touche = e.touches ? e.touches[0] : e
        prePageY = touche.pageY
      },
      onMove (e) {
        if (scrollTop() !== 0) return

        let touche = e.touches ? e.touches[0] : e
        let { pageY } = touche

        let y = pageY - prePageY
        
        if (y < 0) y = 0
        else e.preventDefault()

        currY = (y * 100 / (100 + currY)) // 加上阻力
        setCss()
        statesUpdate()
      },
      onEnd () {
        
      }
    })
  }
}
