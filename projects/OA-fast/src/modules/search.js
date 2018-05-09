import ExcuDelay from './corejs/excu-delay'
export default class {
  constructor () {
    this.excuDelay = new ExcuDelay()
  }
  searchFilter (value, searchKey) {
    let s = true
    if (searchKey && value) {
      searchKey = searchKey.replace(/(\\|\.|\?|\(|\)|\^|\$|\*|\+|\?|{|}|=|!|\||\[|])/g, '\\$1')
      searchKey = searchKey.replace(/ +/g, ' ')
      s = (new RegExp(searchKey.replace(/ /g, '[^]*?'))).test(value)
    }
    return s
  }
  setVal (cb) {
    this.excuDelay.excu(() => {
      cb()
    }, 400)
  }
}
