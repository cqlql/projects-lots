export default class {
  constructor () {
    this.minHeight = 36
    this.bodyHeight = 0
    this.windowHeight = 0
  }
  test () {
    if (this.bodyHeight - this.windowHeight - window.pageYOffset < this.minHeight) {
      return true
    }
  }
  update () {
    this.bodyHeight = document.body.clientHeight
    this.windowHeight = window.innerHeight
  }
}
