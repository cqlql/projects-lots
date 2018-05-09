/**
 *
 * 满屏加载中指示
 *
 */
/* eslint-disable */
import '../css-base/preloader.css'
import './preloader-full.css'
let preloaderFull = {

  el: null,

  isInit: null,
  // isShow: false,

  timeId: null,

  init() {
    // 保证只执行一次
    this.isInit = 1;

    let el = document.createElement('div');

    el.innerHTML = `
<div class="preloader-full">
    <div class="preloader-modal">
        <div class="preloader preloader-white"></div>
    </div>
</div>`;

    this.el = el = el.children[0]

    document.body.appendChild(el);
  },

  // 公开
  show({mask=false,time}={}) {
    this.isInit || this.init();

    // if (this.isShow) { return }
    // this.isShow = true
    this.close()

    let ex =()=> {
      let {classList} = this.el
      classList.add('show');
      if(mask){
        classList.add('mask');
      }
    }

    if (time) {
      this.timeId = setTimeout(ex,time)
    } else{
      ex()
    }
  },

  close() {
    // this.isShow = false
    clearTimeout(this.timeId)
    if(this.el){
      let {classList} = this.el
      classList.remove('show');
      classList.remove('mask');
    }
  }
};


export default preloaderFull;
