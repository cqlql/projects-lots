
export default class {
  // constructor () {
  //   // 年数据: [2017, 2018]
  //   this.years = []
  //   this.months = []
  // }
  // 指定年范围
  setYearRange (start, end) {
    let years = []
    for (let i = start; i <= end; i++) {
      years.push({
        text: i + '年',
        value: i
      })
    }
    this.years = years
    this.months = this.getMonthData()
  }
  // 生成指定年月的数据，否则使用 第一年，第一月
  getData (year, month) {
    let { years, months } = this
    year = year || years[0].value
    month = month || months[0].value

    let data = [this.years, this.months, this.getDayData(year, month)]
    return data
  }

  // 带周的日期数据
  getDataWeek (date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let data = [this.years, this.months, this.getDayDataWeek(year, month)]
    return data
  }

  getMonthData () {
    let months = []
    for (let i = 1; i < 13; i++) {
      months.push({
        text: i + '月',
        value: i
      })
    }
    return months
  }

  // month: 1起始的正常月数
  getDayCount (year, month) {
    var d = new Date(year, month)
    d.setDate(0)
    d.getMinutes()
    return d.getDate()
  }

  // 起始周
  getStartWeek (year, month) {
    var d = new Date(year, month - 1)
    return d.getDay()
  }

  getDayDataWeek (year, month) {
    // 根据1号的周，得到指定号的周
    function getWeek (startWeek, day) {
      return '日一二三四五六'[(startWeek + day - 1) % 7]
    }
    let startWeek = this.getStartWeek(year, month)
    let days = []
    for (let i = 1, len = this.getDayCount(year, month); i <= len; i++) {
      days.push({
        text: i + '日 周' + getWeek(startWeek, i),
        value: i
      })
    }
    return days
  }
  getDayData (year, month) {
    let days = []
    for (let i = 1, len = this.getDayCount(year, month); i <= len; i++) {
      days.push({
        text: i + '日',
        value: i
      })
    }
    return days
  }
  numfill (number) {
    if (number < 10) {
      return '0' + number
    }
    return number
  }
}
