/**
 * 测试是否满足 1/3
 *
 * 1 右滑动，显示左边
 * 2 左滑动，显示右边
 * 0 归位
 */

export default class {
  constructor (width) {
    this.width = width
    this.minLength = width / 3
  }
  getResult (x) {
    if (Math.abs(x) > this.minLength) {
      if (x > 0) {
        return 1
      }
      return 2
    }
    return 0
  }
}
