/**
 * 点外面关闭
 *
 */
export default class OutsideClose {
  outside = true
  constructor (el: HTMLElement, close: () => void) {
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
  on (el: HTMLElement) {
    el.addEventListener('mousedown', () => {
      this.outside = false
    })
    window.addEventListener('mousedown', this.clickOutside)
  }
  off () {
    window.removeEventListener('mousedown', this.clickOutside)
  }
}
