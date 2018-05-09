/**
 * 公共的必须初始化的小功能 - 全端适用
 *
 * Created by cql on 2017/4/24.
 */

import { isMobileIOS } from './device.js'

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { return window.setTimeout(callback, 1000 / 60) }
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.clearTimeout

/**
 * 原型扩展
 * */
if (!String.prototype.trim) {
  /* eslint-disable no-extend-native */
  String.prototype.trim = function () {
    return this.replace(/(^[\s\uFEFF]*)|(\s*$)/g, '')
  }
}
if (!Element.prototype.remove) {
  Element.prototype.remove = function () {
    this.parentNode.removeChild(this)
  }
}

/**
 * ios 移动端 解决 css active 不生效问题
 *
 * */
if (isMobileIOS) {
  document.body.ontouchstart = function () { }
}
