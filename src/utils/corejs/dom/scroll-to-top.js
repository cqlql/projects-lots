/**
 * 设置元素滚动条顶部偏移
 * 或者说：设置滚动条隐藏高度
 *
 * Created by 陈桥黎 on 2017/6/6.
 */


function scrollTop(elem, y) {
    if (elem === window) {
        elem.scrollTo(0, y);
    }
    else {
        elem.scrollTop = y;
    }
}
