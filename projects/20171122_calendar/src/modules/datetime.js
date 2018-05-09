function numFill (number, len) {
  if (number < 10) {
    return '0' + number
  }
  return number
}

export default class {
  getWeekDate (date, noCurr) {
    if (typeof date === 'string') {
      date = new Date(date)
    }

    let data = []

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let lastDay = this.getTotalDays(year, month)

    let week = date.getDay() || 7
    let start = day - week // 起始号 0起始
    let end = day + (7 - week - 1) // 结束号 0起始
    // 有上一月情况/倒退天数
    let prevDay = 0
    if (start < 0) {
      prevDay = Math.abs(start)
      start = 0
    }
    let nextDay = end - (lastDay - 1)
    if (nextDay > 0) {
      end = lastDay - 1
    } else {
      nextDay = 0
    }

    let todayValue = this.getTodayValue()
    for (let i = start + 1, len = end + 2; i < len; i++) {
      let value = `${year}/${numFill(month)}/${numFill(i)}`
      data.push({
        date: i,
        value,
        isCurr: noCurr ? false : day === i,
        isToday: value === todayValue
      })
    }

    if (prevDay) {
      let datePrev = new Date(year, month - 1, 0)
      let yearPrev = datePrev.getFullYear()
      let monthPrev = datePrev.getMonth() + 1
      let lastDayPrev = datePrev.getDate()
      for (let i = 0, len = prevDay; i < len; i++) {
        let date = lastDayPrev - i
        data.unshift({
          date,
          value: `${yearPrev}/${numFill(monthPrev)}/${numFill(date)}`,
          isCurr: false,
          isPrev: true,
          isNext: false
        })
      }
    }

    if (nextDay) {
      let dateNext = new Date(year, month)
      let yearNext = dateNext.getFullYear()
      let monthNext = dateNext.getMonth() + 1
      for (let i = 1, len = nextDay + 1; i < len; i++) {
        data.push({
          date: i,
          value: `${yearNext}/${numFill(monthNext)}/${numFill(i)}`,
          isCurr: false,
          isPrev: false,
          isNext: true
        })
      }
    }
    return data
  }
  getTotalDays (year, month) {
    return (new Date(year, month, 0)).getDate()
  }
  getTodayValue () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}/${numFill(month)}/${numFill(day)}`
  }
}
