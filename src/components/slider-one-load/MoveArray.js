export default class {
  constructor (array) {
    this.array = array
  }
  toLeft () {
    let {array} = this
    array.unshift(array.pop())
  }
  toRight () {
    let {array} = this
    array.push(array.shift())
    console.log('movearray', array)
  }
}
