import './msg-simple.css'

export default function simpleMsg (msgCont) {
  let el = document.createElement('div')
  el.className = 'msg-simple'
  el.textContent = msgCont
  document.body.appendChild(el)
  let {classList} = el
  classList.add('hide')
  setTimeout(() => {
    classList.remove('hide')
    setTimeout(function () {
      classList.add('hide')
    }, 1200)
  }, 0)
}
