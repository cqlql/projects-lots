/**
 * 全局放大看图
 * png 图背景透明情况，黑图案可能看不清，是否针对的提供定制css情况？是否从图片源解决是更好的解决方案？
 * 通过 url 井号传参 #backgroundColor=#fff。目前固定白色背景
 */
import click from '../corejs/dom/click'
import elemZoomPopup from './elem-zoom-popup'
// import getUrlSearch from '../corejs/url/get-url-search'

// function hashParams (src) {
//   let hash = src.match('#(.+)')
//   if (hash) {
//     hash = hash[1]
//   }
//   return hash
// }
// img.style.backgroundColor = getUrlSearch('backgroundColor', hashParams(src)) || 'transparent'

click(document.body, function (e) {
  let {target} = e
  if (target.tagName === 'IMG' && target.dataset.type === '1') {
    // 放大看图
    elemZoomPopup(target, {
      backgroundColor: '#fff'
    }, function (elem, elemz) {
      elemz.dataset.type = ''
    })
  }
})
