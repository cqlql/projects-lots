
export default class {
  constructor () {
    this.data = [{
      item: 0 // 这个固定
    }, {
      item: 1 // 这个固定
    }, {
      item: 2 // 这个固定
    }]
  }
  swipeLeft () {
    let {data} = this
    data.push(data.shift())
  }
  swipeRight () {
    let {data} = this
    data.unshift(data.pop())
  }
}
