/**
 * 公共的必须初始化的小功能 - 全端适用
 *
 * Created by cql on 2017/4/24.
 */

import {isMobileIOS} from './device.js';

/**
 * 原型扩展
 * */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/(^[\s\uFEFF]*)|(\s*$)/g, '');
    }
}
if(!Element.prototype.remove){
  Element.prototype.remove=function () {
    this.parentNode.removeChild(this);
  };
}

/**
 * ios 移动端 解决 css active 不生效问题
 *
 * */
if(isMobileIOS){
  document.body.ontouchstart=function () { };
}
