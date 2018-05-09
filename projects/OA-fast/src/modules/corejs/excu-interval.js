/**
 * 频率执行
 * 高频执行情况，实现按指定间隔执行
 * */
export default function ExcuInterval () {
  let status = 0
  this.excu = function (fn, time) {
    if (status) return
    status = 1
    setTimeout(function () {
      fn()
      status = 0
    }, time)
  }
}
