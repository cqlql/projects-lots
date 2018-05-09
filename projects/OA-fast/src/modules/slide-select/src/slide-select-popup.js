
import '../../popup-bottom/popup-bottom.css'
import './slide-select.css'
import Popup from '../../popup-bottom/popup-bottom'
import SlideSelect from './slide-select'

export default class extends SlideSelect {
  constructor () {
    super()
    this.popup = null
  }
  init () {
    let popup = this.popup = new Popup()
    popup.init()
    popup.setCont(this.getTemplate())

    let child = popup.elCont.children[0].children
    let elBar = child[0]
    this.elTit = child[1]
    this.elMain = child[2]
    this.elInfo = elBar.querySelector('.s-info')
    popup.onClose = () => {
      this.dataHandle.onClose()
    }
    elBar.addEventListener('click', (e) => {
      let {target} = e
      if (target.tagName === 'A') {
        if (target.classList.contains('cfm-btn')) {
          let {dataHandle} = this
          dataHandle.onSelect()
          this.onSelect(dataHandle)
        } else {
          this.close()
        }
      }
    })
  }
  // 初始操作保证只执行一次
  onceInit (cb) {
    this.onceInit = function (cb) { cb() }
    this.init()
    setTimeout(cb, 1)
  }
  show () {
    this.popup.show()
  }
  close () {
    this.popup.close()
  }
  onSelect (dataHandle) {
  }
  getTemplate () {
    let html = `
<div class="slide-select">
  <div class="s-bar">
    <a class="cl-btn">取消</a>
    <a class="cfm-btn">确认</a>
    <div class="s-info"></div>
  </div>
  <div class="s-tit">
    <div class="s-t">标题</div>
  </div>
  <div class="s-main">
    <div class="s-list">
      <div class="s-sel">
        <div class="s-mask s-t-mask"></div>
        <div class="s-mask s-b-mask"></div>
        <ul class="s-move">
          <li class="s-item"></li>
        </ul>
      </div>
    </div>
  </div>
</div>
`
    return html
  }

  use (dataHandle, success = () => {}) {
    if (this.dataHandle === dataHandle) {
      success()
      return
    }
    dataHandle.init(this, success)
    this.dataHandle = dataHandle
  }
}
