/**
 * 弹窗基础
 */
/* eslint-disable */
import './full-page-popup.css'
import click from '../corejs/click'
export default class Popup {

  constructor({
                title = '',
                content = '',
                width,
                outsideClose = true,
                hasTopBar = true,
                created = () => {
                },
                beforeShow = () => {
                },
                beforeClose = () => {
                },
                afterClose = () => {
                }
              } = {}) {

    this.title = title;
    this.content = content;
    this.outsideClose = outsideClose;
    this.width = width;
    this.hasTopBar = hasTopBar;
    this.created = created;
    this.beforeShow = beforeShow;
    this.beforeClose = beforeClose;
    this.afterClose = afterClose;

    // 禁止操作 开关。关闭动画进行中标识
    this.no = false;

    // 公开
    this.rootElem = null;// 根元素
    this.ePopupMain = null;// 居中内容的上一层
    this.ePopupCont = null;// 内容层，可控制窗口宽度
  }

  init() {
    this.init = function () {
    };


    let html = `<div class="full-page-popup">
    <div class="fgp-bg"></div>
    <div class="fgp-main">
        <div class="fgp-bd">
            ${this.hasTopBar ? '<div class="fgp-top-bar"><div class="tit">' + this.title + '</div><b class="close">✖</b></div>' : ''}
            <div class="fgp-cont">${this.content}</div>
        </div>
    </div>
</div>`;

    let template = document.createElement('div');
    template.innerHTML = html;

    this.rootElem = template.children[0];
    this.ePopupMain = this.rootElem.children[1];
    this.ePopupCont = this.ePopupMain.children[0];

    if (this.width) {
      this.ePopupCont.style.width = this.width + 'px';
    }

    document.body.appendChild(this.rootElem);

    // 关闭处理
    click(this.ePopupMain, e => {
      let classList = e.target.classList;
      if (classList.contains('close')) {
        // 关闭按钮关闭

        this.close();
      }
      else if (this.outsideClose && classList.contains('fgp-main')) {
        // 点外面关闭

        this.close();
      }

    });

    this.created();
  }

  show({width} = {}) {

    this.init();

    if (width) {
      this.width = width;
      this.ePopupCont.style.width = width + 'px';
    }

    this.beforeShow();

    setTimeout(() => {
      this.rootElem.classList.add('show');
    }, 0);

  }

  close() {
    if (this.no || this.beforeClose())return;
    this.no = true;

    this.rootElem.classList.remove('show');
    setTimeout(() => {
      this.no = false;
      this.afterClose(this.rootElem);
    }, 300);
  }
}
