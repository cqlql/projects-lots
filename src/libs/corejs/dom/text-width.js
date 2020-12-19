function textWidth (text, setCss) {
  let el = document.createElement('span')
  el.innerHTML = text
  setCss(el.style)
  document.body.appendChild(el)
  let w = el.offsetWidth
  el.remove()
  return w
}

export default textWidth
