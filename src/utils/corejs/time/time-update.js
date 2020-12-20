
/**
 * TimeUpdate 定时更新
 * 完全同步本地系统时间，也就是说会很精确的在系统时间改变后进行更新
 * 假如设置的是每分钟更新，那么会很准确的在秒数到达 00 的时候更新
 * 如果是设置的每30秒更新，么会很准确的在秒数到达 00、30 的时候更新
 **/
export default class {
  // 立即执行，随后开始计时
  start (ex, time) {
    // time 参数：
    // 值为 1000 表示每秒更换
    // 值为 1000*30 表示每30秒更换
    // 值为 1000*60 表示每分钟更换
    // 值为 1000*60*60 表示每小时更换
    // let time = 1000 * 60 * 60

    this.stop()
    let fn = () => {
      ex()
      this.stopId = setTimeout(fn, time - (Date.now() % time))// 此处进行了减少误差计算。完全同步系统时间
    }
    fn()
  }
  stop () {
    clearTimeout(this.stopId)
  }
}
