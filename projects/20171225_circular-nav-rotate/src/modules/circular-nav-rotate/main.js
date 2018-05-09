export default class {
  init ({num, each, r}) {
    let startIndex = 0
    let itemAngle = Math.PI / 2 / (num + 1)
    let move = ang => {
      let itemsPosition = this.itemsPositionCompute(ang, itemAngle, num, r)
      itemsPosition.forEach((xy, i) => {
        each(i - startIndex, xy)
      })
    }
    move(0)
  }

  itemsPositionCompute (start, itemAngle, num, r) {
    let d = []
    start = start % itemAngle
    for (let i = 1, len = num + 1; i < len; i++) {
      let angle = i * itemAngle + start
      d.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r
      })
    }
    return d
  }
}
