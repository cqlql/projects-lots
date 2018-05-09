/**
 * 计算坐标
 * 点与点相加
 * */
export default class Figure {
  constructor () {
    this.prevX = null
    this.prevY = null
  }
  start (x, y) {
    this.prevX = x
    this.prevY = y
  }
  move (x, y, fn) {
    fn(x - this.prevX, y - this.prevY)

    this.prevX = x
    this.prevY = y
  }
}
