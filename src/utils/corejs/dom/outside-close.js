/**
 * 点外面关闭
 * @example
  let outsideClose = new OutsideClose(els, () => {
    this.show = false
  })
 */
// let outsideClose = new OutsideClose({
//   onClose () {
//     dataApi.activeIndex = -1
//   },
//   check (eventElement) {
//     return eventElement.className.indexOf('cke') > -1
//   }
// })
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
/**
 *
 * @param {Element, Array} els 里面元素,不触发关闭的元素。多个元素时，只要有 forEach 的集合就行
 *
 */
export default class OutsideClose {
  constructor (els, close) {
    this.close = close
    this.outside = true
    this.clickOutside = this.clickOutside.bind(this)
    this.on(els)
  }

  close () {}
  clickOutside () {
    if (this.outside) {
      this.close()
    }
    this.outside = true
  }

  on (els) {
    console.log(els)
    const inside = () => {
      this.outside = false
    }
    if (!els.forEach) {
      els = [els]
    }
    els.forEach(el => {
      console.log(el)
      el.addEventListener('mousedown', inside)
    })

    window.addEventListener('mousedown', this.clickOutside)
  }

  off () {
    window.removeEventListener('mousedown', this.clickOutside)
  }
}
