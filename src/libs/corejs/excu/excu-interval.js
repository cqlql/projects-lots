/**
 * 频率执行
 * 高频执行情况，实现按指定间隔执行
 *
 * @example
 * let excuInterval = new ExcuInterval()
 * excuInterval.excu(()=>{},300)
 * */
export default class ExcuInterval {
  excu (fn, time) {
    if (this.status) return
    this.status = 1
    setTimeout(() => {
      fn()
      this.status = 0
    }, time)
  }
}
