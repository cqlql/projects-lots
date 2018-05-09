
let handle = function (elem, className) {
  if (elem.classList) {
    handle = function (elem, className) {
      return elem.classList.contains(className)
    }
  } else {
    handle = function (elem, className) {
      return (' ' + elem.className + ' ').indexOf(' ' + className.trim() + ' ') > -1
    }
  }
  return handle(elem, className)
}

export default function hasClass (elem, className) {
  return handle(elem, className)
}
