import './msg-simple.css'
// v1 没有渐出动画
export default function simpleMsg (msgCont) {
  let msg = document.createElement('div')
  msg.className = 'msg-simple'
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

// v2 有渐出动画
// export default function simpleMsg (msgCont) {
//   let el = document.createElement('div')
//   el.className = 'msg-simple'
//   el.textContent = msgCont
//   document.body.appendChild(el)
//   let {classList} = el
//   classList.add('hide')
//   setTimeout(() => {
//     classList.remove('hide')
//     setTimeout(function () {
//       classList.add('hide')
//       el.addEventListener('transitionend', function () { el.remove() })
//       el.addEventListener('webkitTransitionEnd', function () { el.remove() })
//     }, 1200)
//   }, 0)
// }
