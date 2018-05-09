let compute = function () {
  compute = 'pageXOffset' in window ? function () {
    return pageXOffset
  } : function () {
    return document.documentElement.scrollLeft
  }
  return compute()
}

export default function scrollLeft () {
  return compute()
}
