/**
 * 频率执行
 * 高频执行情况，实现按指定间隔执行
 *
 * @example
 * let excuInterval = ExcuInterval()
 * excuInterval(()=>{},300)
 * */
/* export default function ExcuInterval () {
  let status = 0
  return function (fn, time) {
    if (status) return
    status = 1
    setTimeout(function () {
      fn()
      status = 0
    }, time)
  }
} */
export default class ExcuInterval {
  excu (fn, time) {
    if (this.status) return
    this.status = 1
    setTimeout(function () {
      fn()
      this.status = 0
    }, time)
  }
}
