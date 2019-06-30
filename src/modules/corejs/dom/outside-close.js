/**
 *
 * @example
  let outsideClose = new OutsideClose({
    onClose () {
      dataApi.activeIndex = -1
    },
    check (eventElement) {
      return eventElement.className.indexOf('cke') > -1
    }
  })
 */
// export default class OutsideClose {
//   /**
//    * @param {function} check 检查，true 则不关闭
//    */
//   constructor ({ onClose, check = () => false }) {
//     this.onActive = ({ target }) => {
//       if (this.isOutSide && !check(target)) {
//         onClose()
//         this.off()
//       }
//       this.isOutSide = true
//     }
//   }
//   on () {
//     this.isOutSide = false
//     if (this.isActive) return
//     this.isActive = true
//     document.addEventListener('mousedown', this.onActive)
//   }
//   off () {
//     this.isActive = false
//     document.removeEventListener('mousedown', this.onActive)
//   }
// }

export default class OutsideClose {
  outside = true
  constructor (el, close) {
    this.close = close
    this.clickOutside = this.clickOutside.bind(this)
    this.on(el)
  }
  close () {}
  clickOutside () {
    if (this.outside) {
      this.close()
    }
    this.outside = true
  }
  on (el) {
    el.addEventListener('mousedown', () => {
      this.outside = false
    })
    window.addEventListener('mousedown', this.clickOutside)
  }
  off () {
    window.removeEventListener('mousedown', this.clickOutside)
  }
}
