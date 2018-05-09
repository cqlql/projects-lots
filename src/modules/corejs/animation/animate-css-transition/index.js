import transitionendOnce from '../transitionend-once'

function css (style, styleValue) {
  for (let k in styleValue) {
    if (styleValue.hasOwnProperty(k)) {
      style[k] = styleValue[k]
    }
  }
}

export default function (el, animateActiveClassName, styleValue) {
  let {style, classList} = el
  if (classList.contains(animateActiveClassName)) {
    css(style, styleValue)
  } else {
    classList.add(animateActiveClassName)
    transitionendOnce(el, () => { classList.remove(animateActiveClassName) })
    css(style, styleValue)
  }
}
