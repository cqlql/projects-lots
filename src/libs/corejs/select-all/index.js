/**
 * crated data: 20181218
 */
class SelectAll {
  constructor () {
    this.total = 0 // 可选择总数
    this.selectNum = 0 // 当前选择数
  }
  // 重置
  // reset (total, selectNum = 0) {
  //   this.total = total
  //   this.selectNum = selectNum
  // }
  select (checked) {
    if (checked) {
      this.selectNum++
    } else {
      this.selectNum--
    }
    // return this.getStates()
  }
  selectAll (checked) {
    this.selectNum = checked ? this.total : 0
  }
  // 0 没有选择 1 全选 2 有选择
  getStates () {
    if (this.isNo()) {
      return 0
    }
    if (this.isAll()) {
      return 1
    }
    return 2
  }
  // 是否全选
  isAll () {
    return this.selectNum === this.total
  }
  // 没有任何选择
  isNo () {
    return this.selectNum === 0
  }
}

export default SelectAll
