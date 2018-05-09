import RandomNums from './random-nums'

export default class {
  constructor ({eUl}) {
    this.eUl = eUl
    this.eItems = eUl.children
    this.randomNums = new RandomNums()
    this.preItemsIndex = [0]
  }
  start () {
    let {eUl, eItems} = this
    eUl.classList.remove('complete')
    this.randomNums.start(itemsIndex => {
      this.preItemsIndex.forEach(i => {
        eItems[i].classList.remove('active')
      })
      itemsIndex.forEach(i => {
        eItems[i].classList.add('active')
      })
      this.preItemsIndex = itemsIndex
    }, () => {
      setTimeout(function () {
        eUl.classList.add('complete')
      }, 200)
    })
  }
}
