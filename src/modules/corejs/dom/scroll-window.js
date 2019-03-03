// 兼容 ie678 写法
let scrollLeft = function () {
  scrollLeft = 'pageXOffset' in window ? function () {
    return pageXOffset
  } : function () {
    return document.documentElement.scrollLeft
  }
  return scrollLeft()
}
let scrollTop = function () {
  scrollTop = 'pageYOffset' in window ? function () {
    return pageYOffset
  } : function () {
    return document.documentElement.scrollTop
  }
  return scrollTop()
}

export default {
  scrollLeft () {
    scrollLeft()
  },
  scrollTop () {
    scrollTop()
  }
}
