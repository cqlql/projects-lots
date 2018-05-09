import './simple-msg.css'

export default function simpleMsg (msgCont) {
  let msg = document.createElement('div')
  msg.className = 'simple-msg'
  msg.textContent = msgCont
  document.body.appendChild(msg)

  msg.addEventListener('transitionend', function () {
    msg.remove()
  })
  msg.addEventListener('webkitTransitionEnd', function () {
    msg.remove()
  })

  setTimeout(function () {
    msg.classList.add('hide')
  }, 1200)
}
