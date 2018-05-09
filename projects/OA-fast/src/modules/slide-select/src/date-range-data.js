
export default class {
  constructor () {
    this.initSelectIndex = [9, 0, 0, 8, 0, 0]
  }

  init (slideSelect) {
    let selectIndexs = this.indexs = this.selectIndexs || this.initSelectIndex
    this.result = []
    this.resultTxt = ''

    this.slideSelect = slideSelect

    let data = this.createDate()

    slideSelect.setData(data)
    slideSelect.setTits(['开始时间', '结束时间'])
    slideSelect.select(selectIndexs)
    this.updateInfo()
  }

  createDate () {
    let data = []
    data = data.concat(this.getData(2017 - 10))
    data = this.data = data.concat(data)

    return data
  }
  getInitDate () {
    let data = this.createDate()
    let indexs = this.initSelectIndex

    let result = []
    for (let i = 0, len = data.length; i < len; i++) {
      let index = indexs[i]
      result.push(data[i][index])
    }
    let resultTxt = `${result[0]}/${result[1]}/${result[2]}~${result[3]}/${result[4]}/${result[5]}`

    return {result, resultTxt}
  }

  onChange (i) {
    let {slideSelect, data} = this
    let {sels} = this.slideSelect

    // 联动
    if (i < 2) {
      slideSelect.setData(this.getDayData(data[0][sels[0].currIndex], data[1][sels[1].currIndex]), 2)
    } else if (i === 3 || i === 4) {
      slideSelect.setData(this.getDayData(data[3][sels[3].currIndex], data[4][sels[4].currIndex]), 5)
    }

    this.updateInfo()
  }
  onClose () {}
  onSelect () {
    this.selectIndexs = this.indexs
  }

  // month 从1 开始
  getDayCount (year, month) {
    var d = new Date(year, month)
    d.setDate(0)
    return d.getDate()
  }

  getDayData (year, month) {
    let days = []
    for (let i = 0, len = this.getDayCount(year, month); i < len; i++) {
      days.push(i + 1)
    }
    return days
  }

  getData (startYear) {
    let data = [[], [], []]
    for (let i = 20; i--;) {
      data[0].push(startYear + i)
    }
    for (let i = 1; i < 13; i++) {
      data[1].push(i)
    }
    data[2] = this.getDayData(data[0][0], 1)
    return data
  }

  updateInfo () {
    let {slideSelect, data} = this
    let {sels} = slideSelect

    let indexs = this.indexs = []
    let result = this.result = []

    for (let i = 0, len = data.length; i < len; i++) {
      let index = sels[i].currIndex
      result.push(data[i][index])
      indexs.push(index)
    }

    this.resultTxt = slideSelect.elInfo.textContent = `${result[0]}/${result[1]}/${result[2]}~${result[3]}/${result[4]}/${result[5]}`
  }
}
