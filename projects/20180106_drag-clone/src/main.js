import offsetxy from './modules/corejs/dom/offsetxy'
import drag from './modules/corejs/drag/drag-plus'
import autoprefix from './modules/corejs/dom/css/autoprefix'

let transform = autoprefix('transform')[1]

let imgs = document.querySelectorAll('img')

for (var i = 0, len = imgs.length; i < len; i++) {
  let currx = 0
  let curry = 0
  let img = imgs[i]
  let clone
  drag({
    elem: img,
    onDown (e) {
      e.preventDefault()
    },
    onStart () {
      currx = 0
      curry = 0
      clone = new Clone()
      clone.init({img})
    },
    onMove ({x, y, e}) {
      e.preventDefault()
      currx += x
      curry += y
      clone.move(currx, curry)
    }
  })
}

class Clone {
  init ({img}) {
    this.currx = 0
    this.curry = 0

    let div = document.createElement('div')
    div.innerHTML = img.outerHTML
    let imgClone = this.imgClone = div.children[0]

    let {left: x, top: y} = offsetxy(img)
    imgClone.style.position = 'absolute'
    imgClone.style.left = x + 'px'
    imgClone.style.width = '80px'

    document.body.appendChild(imgClone)
    // imgClone.style.top = y - imgClone.clientHeight / 2 + 'px'
    imgClone.style.top = y + 'px'

    let currx
    let curry
    drag({
      elem: imgClone,
      onDown (e) {
        e.preventDefault()
      },
      onStart: () => {
        currx = this.currx
        curry = this.curry
      },
      onMove: ({x, y, e}) => {
        e.preventDefault()
        currx += x
        curry += y
        this.move(currx, curry)
      }
    })
  }

  move (x, y) {
    this.currx = x
    this.curry = y
    this.imgClone.style[transform] = `translate(${x}px, ${y}px)`
  }
}
