
export default class SwitchBase {
  constructor (total) {
    this.total = total
    this.showIndex = 0
  }
  switch (index) {
    // let { showIndex } = this
    //   if (index === showIndex) return
    //   if (index > showIndex) {
    //     this.excu(this.leftClass, index)
    //   } else {
    //     this.excu(this.rightClass, index)
    //   }
  }
  // 向左移动，显示右边
  switchLeft () {
    let index = this.showIndex + 1
    if (index >= this.total) index = 0
  }
  // 向右移动，显示左边
  switchRight () {
    let index = this.showIndex - 1
    if (index < 0) index = this.total - 1
  }
}
