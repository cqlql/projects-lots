
/* eslint-disable */

/**
 * 时间格式美化
 *
 * 未来：2018/1/17
 * 过去某年：2015/1/17
 * 今年：1/17
 *
 * @param time 2017-04-12 16:58:11
 * */
export default function dateTimeBeautify(time) {
  if (!time) return
  time = time.replace(/-/g, '/')// 解决ios 不支持-号连接
  let t, n, nday, timeCont = ''

  t = new Date(time)
  n = new Date
  nday = n.getDay()

  if (nday === 0) nday = 7

  // 目前只处理2位
  let fill = (number) => {

    if (number < 10) {

      return '0' + number
    }
    return number
  }

  let getYYMMDD = (d) => {
    return d.getFullYear() + '' + fill(d.getMonth()) + '' + fill(d.getDate())
  }

  let getmmss = () => {
    return ''
  }

  let dif = getYYMMDD(n) - getYYMMDD(t)

  if (dif < 0) {
    // 未来某天
    timeCont = t.getFullYear() + '/' + (t.getMonth() + 1) + '/' + t.getDate() + getmmss()
  }
  /* else if (dif === 0) {
    // 今天
    timeCont = getmmss()
  }
  else if (dif === 1) {
    // 昨天
    timeCont = '昨天' + getmmss()
  }
  else if (dif < nday) {
    // 本周
    timeCont = '周' + ['', '一', '二', '三', '四', '五', '六', '末'][nday - dif] + getmmss()
  } */
  else {
    let
      tY = t.getFullYear(),
      difY = n.getFullYear() - tY,
      yy = ''
    if (difY !== 0) {
      // 非今年
      yy = tY + '/'
    }

    timeCont = yy + (t.getMonth() + 1) + '/' + t.getDate() + getmmss()
  }

  return timeCont
}
