/*
 几乎完全使用css 控制 几点前提：
 1 窗口元素
 2 包裹文字元素，能通过此文字元素能获取文字的总长度
 */

/* 内容有图片情况的使用
this.$refs.eCont.innerHTML = content
let imgs = this.$el.getElementsByTagName('img')
if (imgs.length) {
  imgsComplete(imgs, () => {
    this.textMarquee.downUpdate()
  })
} else {
  this.textMarquee.downUpdate()
}
*/

// acrossUpdate downUpdate 可重复调用。已做销毁处理

// eBox = params.eBox,
// eText = params.eText,
// type = params.type ? 'h' : 'w',// 默认是宽度

// 每秒滚动的像素
// let perSecMove = 50;

// 2段文字的间距（与后面的重复文字间距）
// let interval = 100;
export default class TextMarquee {
  constructor ({eBox, eText, perSecMove = 30, interval = 80}) {
    this.eBox = eBox
    this.eText = eText
    this.perSecMove = perSecMove
    this.interval = interval
  }
  acrossUpdate (htmlTxt) {
    this.destroy()
    let {eBox, eText, perSecMove, interval} = this
    if (htmlTxt) eText.innerHTML = htmlTxt
    else htmlTxt = eText.innerHTML
    eText.style.display = 'inline'
    let textW = eText.offsetWidth
    eText.style.display = 'block'
    if (textW > eBox.clientWidth) {
      textW += interval
      let html = '<span style="padding-right:' + interval + 'px">' + htmlTxt + '</span>'
      let moveId = 'move' + Date.now()// (Math.random()+'').substr(2)

      eText.className = moveId
      eText.innerHTML = html + html

      // css
      let duration = (textW / perSecMove).toFixed(2)// 每秒滚动像素。计算需要多少秒
      let eStyle = this.eStyle = document.createElement('style')
      eStyle.textContent = '.' + moveId + '{' +
        '-webkit-animation:' + moveId + ' ' + duration + 's infinite linear normal;' +
        'animation:' + moveId + ' ' + duration + 's infinite linear normal}' +
        '@keyframes ' + moveId + '{0%{' +
        'transform:translate3d(0,0,0)}100%{' +
        'transform:translate3d(-' + textW + 'px,0,0)}}' +
        '@-webkit-keyframes ' + moveId + '{0%{' +
        '-webkit-transform:translate3d(0,0,0)}100%{' +
        '-webkit-transform:translate3d(-' + textW + 'px,0,0)}}'
      document.body.appendChild(eStyle)
    }
  }
  downUpdate (htmlTxt) {
    this.destroy()
    let {eBox, eText, perSecMove, interval} = this
    if (htmlTxt) eText.innerHTML = htmlTxt
    else htmlTxt = eText.innerHTML
    let textH = eText.offsetHeight
    if (textH > eBox.clientHeight) {
      textH += interval
      let html = '<div class="text-marquee-down-txt" style="padding-bottom:' + interval + 'px">' + htmlTxt + '</div>'
      let moveId = 'move' + Date.now()// (Math.random()+'').substr(2)
      eText.className = moveId

      eText.innerHTML = html + html

      // css
      let duration = (textH / perSecMove).toFixed(2)// 每秒滚动像素。计算需要多少秒
      let eStyle = this.eStyle = document.createElement('style')
      eStyle.textContent = '.' + moveId + '{' +
        '-webkit-animation:' + moveId + ' ' + duration + 's infinite linear normal;' +
        'animation:' + moveId + ' ' + duration + 's infinite linear normal}' +
        '@keyframes ' + moveId + '{0%{' +
        'transform:translate3d(0,0,0)}100%{' +
        'transform:translate3d(0,-' + textH + 'px,0)}}' +
        '@-webkit-keyframes ' + moveId + '{0%{' +
        '-webkit-transform:translate3d(0,0,0)}100%{' +
        '-webkit-transform:translate3d(0,-' + textH + 'px,0)}}'
      document.body.appendChild(eStyle)
    }
  }

  destroy () {
    let {eStyle} = this
    eStyle && eStyle.remove()
  }
}
