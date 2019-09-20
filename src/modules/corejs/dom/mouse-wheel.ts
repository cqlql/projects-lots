type onmousewheel = ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;

declare global {
  interface Document {
    onmousewheel: onmousewheel
  }
  interface HTMLElement {
    // attachEvent(type: string, listener: (evt: Event) => void): void;
    // detachEvent(type: string, listener: (evt: Event) => void): void;
    onmousewheel: onmousewheel
  }
}
interface AllWheelEvent extends WheelEvent {
  deltaY: number
  wheelDelta: number
}
let mouseWheel = function (el: HTMLElement|Document, cb: (e: Event) => void): () => void {
  if (el.onwheel !== undefined) { // 高版本浏览器
    mouseWheel = function (el: HTMLElement|Document, cb: (e: Event) => void): () => void {
      el.addEventListener('wheel', cb)
      return function () {
        el.removeEventListener('wheel', cb)
      }
    }
  } else if (el.onmousewheel !== undefined) { // 旧版 chrome 和 IE
    if (el.addEventListener) { // ie9+、chrome
      mouseWheel = function (el: HTMLElement|Document, cb: (e: Event) => void): () => void {
        function wheel (this: GlobalEventHandlers, e: Event) {
          if ('deltaY' in e === false) {
            (e as AllWheelEvent).deltaY = -1 / 40 * (e as AllWheelEvent).wheelDelta
          }
          cb.call(this, e)
        }
        el.addEventListener('mousewheel', wheel)
        return function () {
          el.removeEventListener('mousewheel', wheel)
        }
      }
    }
    // else { // ie678
    //   mouseWheel = function (el: HTMLElement, cb: (e: WheelEvent) => void): () => void {
    //     function wheel (this: GlobalEventHandlers, e: Event) {
    //       (e as AllWheelEvent).deltaY = -1 / 40 * (e as AllWheelEvent).wheelDelta
    //       cb.call(this, e as WheelEvent)
    //     }
    //     el.attachEvent('onmousewheel', wheel)
    //     return function () {
    //       el.detachEvent('onmousewheel', wheel)
    //     }
    //   }
    // }
  } else { // 低版本firefox
    mouseWheel = function (el: HTMLElement|Document, cb: (e: Event) => void): () => void {
      function wheel (this: GlobalEventHandlers, e: Event) {
        if ('deltaY' in e === false) {
          (e as AllWheelEvent).deltaY = (e as AllWheelEvent).detail
        }
        cb.call(this, e)
      }
      el.addEventListener('DOMMouseScroll', wheel)
      return function () {
        el.removeEventListener('DOMMouseScroll', wheel)
      }
    }
  }
  return mouseWheel(el, cb)
}

export default mouseWheel
