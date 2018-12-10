/**
 * 针对pc鼠标事件实现
 *
 * 此处使用了点点相加处理，如需更加灵活，请使用drag-base
 *
 * 兼容性：ie9+
 */

import dargBase from './drag';
import Figure from './figure';

let figure = new Figure;

export default function drag({
  eDrag, onMove,
  onDown = () => { },
  onUp = () => { }
}) {
  dargBase({
    eDrag,
    onMove(event){
      figure.move(event.pageX, event.pageY, function (x, y) {
        onMove({x, y, event});
      });
    },
    onDown(e){
      if (onDown(e) === false)return false;
      figure.start(e.pageX, e.pageY);
    },
    onUp
  })
}
