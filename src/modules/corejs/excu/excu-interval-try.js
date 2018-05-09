/**
 * 间隔反复尝试执行，直到返回 false
 * 可实现监听某对象是否加载成功
 *
 * 第一次会同步立马执行
 *
 * */
export default function excuIntervalTryPlus (tryExcu, error = () => {}, timeOut = 10000, interval = 400) {
  let isTimeout = false
  setTimeout(function () {
    isTimeout = true
  }, timeOut)

  function excu (tryExcu) {
    if (isTimeout) {
      error('timeout')
      return
    }
    if (tryExcu() === false) {
      return
    }
    setTimeout(function () {
      excu(tryExcu)
    }, interval)
  }

  excu(tryExcu, interval)
}
