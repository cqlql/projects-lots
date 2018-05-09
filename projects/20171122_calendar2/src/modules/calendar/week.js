// let d = {
//   currDate: '', // 当前选择。默认为 startDate。加载数据根据此初始化
//   startDate: '', // 一周的开始时间。可作为id
//   endDate: '', // 一周的结束时间
//   firstDays: [],
//   secondDays: [],
//   // 可快速判断选定天是否在当前星期
//   daysKey: {4: 1, 5: 1}
// }

// function datefill (s) {
//   return s.replace(/-(\d)(?=(-|$))/g, '-0$1')
// }

function numfill (number) {
  if (number < 10) {
    return '0' + number
  }
  return number
}

export default class Week {
  // 从星期1起始，从星期天起始待实现
  // 可以是对象，可以是字符串(2017-12-5)
  buildWeekData (date) {
    date = typeof date === 'string' ? new Date(date) : date
    let firstDays = []
    let secondDays = []
    let daysKey = {}
    let currYear = date.getFullYear()
    let currMonth = date.getMonth() + 1
    let d = date.getDate() // 当前天
    let w = date.getDay() || 7 // 当前星期
    // 当前月总天数
    let totalDayNum = this.getTotalDays(currYear, currMonth)

    let currDayKeyValHalf = currYear + '-' + numfill(currMonth) + '-'
    let currDate = currDayKeyValHalf + numfill(d)
    let startDate = ''
    let endDate = ''

    // 前后半部分处理。天，星期
    function weekHalfHandle (d, w) {
      let v = d - w
      if (v < 0) { // 上月
        let preDate = new Date(currYear, currMonth - 1, 0)
        let preYear = preDate.getFullYear()
        let preMonth = preDate.getMonth() + 1
        let preTotalDayNum = preDate.getDate()
        let dayKeyValHalf = preYear + '-' + numfill(preMonth) + '-'
        for (let i = v; i++;) {
          let day = preTotalDayNum + i
          daysKey[day] = dayKeyValHalf + numfill(day)
          firstDays.push(day)
        }
        startDate = dayKeyValHalf + numfill(firstDays[0])
        endDate = currYear + '-' + currMonth
      } else if (7 - w + d > totalDayNum) { // 当前年
        for (let i = d - w + 1; i <= totalDayNum; i++) {
          daysKey[i] = currDayKeyValHalf + numfill(i)
          firstDays.push(i)
        }
        startDate = currDayKeyValHalf + numfill(firstDays[0])
      }
      // 下一半
      let firstDayNum = firstDays.length
      if (firstDayNum) {
        let dayKeyValHalf
        if (endDate) {
          dayKeyValHalf = currDayKeyValHalf
        } else {
          let nextDate = new Date(currYear, currMonth, 1)
          dayKeyValHalf = nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) + '-'
        }
        for (let i = 1, len = 8 - firstDayNum; i < len; i++) {
          daysKey[i] = dayKeyValHalf + numfill(i)
          secondDays.push(i)
        }
        endDate = dayKeyValHalf + secondDays[secondDays.length - 1]
      } else {
        for (let i = v + 1, len = i + 7; i < len; i++) {
          daysKey[i] = currDayKeyValHalf + numfill(i)
          secondDays.push(i)
        }
        startDate = currDayKeyValHalf + numfill(secondDays[0])
        endDate = currDayKeyValHalf + numfill(secondDays[6])
      }
    }
    weekHalfHandle(d, w)

    return {
      currDay: d,
      currDate, // : datefill(currDate),
      startDate, // : datefill(startDate),
      endDate, // : datefill(endDate),
      firstDays,
      secondDays,
      daysKey
    }
  }
  getTotalDays (year, month) {
    return (new Date(year, month, 0)).getDate()
  }
  // 0 上一半，1 下一半
  // whichHalf (d) {
  //   if (d < this.firstDays[0]) {
  //     return 0
  //   }
  //   return 1
  // }
}
