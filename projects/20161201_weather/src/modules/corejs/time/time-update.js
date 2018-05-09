
/**
 * TimeUpdate 定时更新。同步系统时间
 **/
export default class {
  // 立即执行，随后开始计时
  start (ex, time) {
    // time 参数：
    // 值为 1000 表示每秒更换
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
