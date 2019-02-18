
export default class {
  constructor ({ el, highlightedIndex }) {
    this.el = el
    this.highlightedIndex = highlightedIndex
  }
  highlight (index) {
    let eBox = this.el
    let eItem = eBox.children[index]
    let scrollTop = eBox.scrollTop
    let boxHeight = eBox.clientHeight
    let itemHeight = eItem.offsetHeight
    let itemTop = eItem.offsetTop

    if (itemTop < scrollTop) { // 隐藏在上部分
      eBox.scrollTop = itemTop
    } else if (itemHeight + itemTop > boxHeight + scrollTop) { // 隐藏在下部分
      eBox.scrollTop = itemTop - boxHeight + itemHeight
    }
    return index
    // this.highlightedIndex = index
  }
  highlightPrev () {
    let highlightedIndex = this.highlightedIndex
    let index = highlightedIndex
    index -= 1
    if (index < 0) index = 0
    if (highlightedIndex === index) return index
    return this.highlight(index)
  }
  highlightNext () {
    let highlightedIndex = this.highlightedIndex
    let index = highlightedIndex
    let max = this.el.children.length - 1
    index += 1
    if (index >= max) index = max
    if (highlightedIndex === index) return index
    return this.highlight(index)
  }
}
