
class Handle {
  // param date: [2018,1,1]
  dateArray (date, fmt) {
    function fill (num) {
      num *= 1
      if (num < 10) return '0' + num
      return num
    }
    function doubleHandle (v, fmt) {
      if (fmt.length === 2) {
        return fill(v)
      }
      return v
    }
    let str = fmt.replace(/y+/, date[0])
      .replace(/M+/, function (el) {
        return doubleHandle(date[1], el)
      })
      .replace(/d+/, function (el) {
        return doubleHandle(date[2], el)
      })
      .replace(/h+/, function (el) {
        return doubleHandle(date[3], el)
      })
      .replace(/m+/, function (el) {
        return doubleHandle(date[4], el)
      })
    return str
  }
  strHandle (str, fmt) {
    return this.dateArray(str.match(/\d+/g), fmt)
  }
  dateHandle (date, fmt) {
    return this.dateArray([date.getFullYear(), date.getMonth() + 1, date.getDate()], fmt)
  }
}

let handle = new Handle()

export default function (date, fmt = 'yyyy-MM-dd') {
  if (typeof date === 'string') {
    return handle.strHandle(date, fmt)
  } else {
    return handle.dateHandle(date, fmt)
  }
}
