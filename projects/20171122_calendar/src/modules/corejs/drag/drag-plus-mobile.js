/**
 * Created by cql on 2017/2/24.
 *
 * 针对移动端触摸事件实现
 *
 * 移动情况只针对touches的第一个触摸点做处理
 *
 * 兼容性：ie9+
 *
 *
 */
import Figure from './figure';
import dargBase from './drag-mobile';

let figure = new Figure;

// @param onMove 使用点点相加
// 其他参数见 drag-base-mobile
export default function dragMobile({eDrag, onMove, onStart=()=>{}, onDown=()=>{}, onEnd}) {
    dargBase({
        eDrag,
        onMove(event){
            let touche = event.touches[0];

            figure.move(touche.pageX, touche.pageY, function (x, y) {
                onMove({x, y, event});
            });
        },
        onDown,
        onStart(e){

            let touche = e.touches[0];

            figure.start(touche.pageX, touche.pageY);

            onStart(e);
        },
        onEnd
    });
}
