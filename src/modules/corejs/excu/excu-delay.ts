/**
 * 延时 有效执行
 指定时间内再次调用。将重新计时
 实现 快速更新 情况 实现在 在最后结束后再更新

精简代码备份
let timeId
function excu (callBack, time) {
  clearTimeout(timeId)
  timeId = setTimeout(callBack, time)
}
 */
export default class ExcuDelay {
  timeId: number|undefined
  excu (callBack:()=>void, time = 200) {
    this.clear()

    if (time === 0) {
      callBack()
    } else {
      this.timeId = setTimeout(() => {
        this.timeId = undefined
        callBack()
      }, time)
    }
  }
  clear () {
    let { timeId } = this
    if (timeId !== undefined) {
      clearTimeout(timeId)

      this.timeId = undefined

      return true
    }
    return false
  }

  getStatus () {
    return this.timeId !== undefined
  }
}
