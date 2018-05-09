/**
 * 阻止频率执行。立即执行，并且保证执行一次
 * 先执行触发，后重复执行将不触发，除非时间到，或者手动终止计时
 * */
export default function ExcuOne () {
  let timeId = null

  this.excu = function (callBack, time) {
    if (timeId === null) {
      callBack()
    }

    timeId = setTimeout(function () {
      timeId = null
    }, time || 200)
  }

  this.clear = function () {
    timeId = null
  }
}
