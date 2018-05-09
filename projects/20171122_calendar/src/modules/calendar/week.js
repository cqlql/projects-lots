/* eslint-disable */

let d = {
  year: '2017',
  month: '12',
  // days: [4, 5, 6, 7, 8, 9, 10],
  firstDays: [],
  secondDays: [],
  // 可快速判断选定天是否在当前星期
  daysKey: {4: 0, 5: 1}

}


class Week {
  constructor () {

  }
  buildWeekData (dateStr) {
    let currDate = new Date(dateStr)
    let w = currDate.getDay() || 7

    console.log(w)

  }
}


let week = new Week()

week.buildWeekData('2017-12-1')
