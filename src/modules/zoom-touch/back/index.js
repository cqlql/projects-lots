// import ZoomTouch from './zoom-touch'
// import PictureZoom from './picture-zoom'
import './picture-zoom.css'
import PictureZoomPopup from './picture-zoom-popup'

// 图片放大弹窗单实例
let pictureZoomPopupHandle = {
  show (src, min, max) {
    pictureZoomPopupHandle = new PictureZoomPopup()
    pictureZoomPopupHandle.show(src, min, max)
  }
}
let pictureZoomPopup = {
  show (src, min, max) {
    pictureZoomPopupHandle.show(src, min, max)
  }
}

export default pictureZoomPopup

// export {
//   ZoomTouch,
//   PictureZoom,
//   PictureZoomPopup,
//   pictureZoomPopup
// }
