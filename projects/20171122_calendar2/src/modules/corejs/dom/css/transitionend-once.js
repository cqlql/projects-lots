export default function transitionendOnce (elem, cb) {
  let transitionend = () => {
    elem.removeEventListener('transitionend', transitionend)
    elem.removeEventListener('webkitTransitionEnd', transitionend)
    cb()
  }
  console.log(elem)
  elem.addEventListener('transitionend', transitionend)
  elem.addEventListener('webkitTransitionEnd', transitionend)
}
