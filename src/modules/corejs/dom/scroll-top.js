let compute = function () {
  compute = 'pageYOffset' in window ? function () {
    return pageYOffset
  } : function () {
    return document.documentElement.scrollTop
  }
  return compute()
}

export default function scrollTop () {
  return compute()
}
