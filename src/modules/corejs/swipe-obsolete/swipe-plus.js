/**
 * Created by cql on 2017/2/24.
 *
 * 左右滑动实现-移动端 - 已弃用
 *
 * 待扩张为 上下滑动，目测只要对将 pageX 处理成动态的可指定字符串即可
 *
 * 不支持多点，固定使用touches中的第一个点
 *
 * 区别y方向的滚动手势：比如绑定左右滑动情况，支持上下滑动滚动条而不冲突
 *
 */

import drag from '../drag/drag-mobile';
import Swipe from './swipe';

// 激活：滑动中又有滑动情况，保证滑动动作只激活一个实例，
// 其实是冒泡的模拟实现。之所以要模拟，因为onStart 是在onMove 中被触发，而在 onMove 中阻止冒泡会频率触发，总感觉浪费性能
// 可根据 active 搜索关键字开启
// 最终还是觉得使用 stopPropagation 阻止冒泡更直接吧
// let active = false;

export default function swipePlus
    ({
         eDrag,
         swipeLeft = () => {
         },
         swipeRight = () => {
         },
         swipeNot = () => {
         },
         // 按下即触发
         onDown = () => {
         },
         // 拖动开始
         onStart = () => {
         },
         onMove = () => {
         },
         // 拖动结束
         onEnd = () => {
         }

     }) {


    let swipeBase = new Swipe();

    // 此处的 active = swipeBase 用来区别是不是同一个实例
    // active = swipeBase;

    let

        startX,
        startY,

        //
        isStart = false,

        // 滑动手势取消，不会再触发
        isCancel = false;

  drag({
        eDrag,
        onMove (e) {
            // 保证滑动动作只激活此一个实例
            e.stopPropagation();

            if (isCancel)return;

            let touche = e.touches[0],
                moveX = touche.pageX, moveY = touche.pageY;

            if (isStart === false) {

                let
                    xlen = moveX - startX,
                    ylen = moveY - startY;

                // 手势相对于x轴 小于 57 度情况滑动才开始。1位弧度值
                // xlen为0，即除数为0，此时是90度，Math.atan是否支持，测试结果 Math.atan(1 / 0)*180/Math.PI => 90 。说明Math.atan支持
                if (Math.abs(Math.atan(ylen / xlen)) < 1) {
                    isStart = true;
                    onStart(e);
                    swipeBase.start(startX);
                }
                else {
                    isCancel = true;
                }
                // 调试，微调弧度值，直到最精确
                // debugMsg(Math.abs(Math.atan(ylen / xlen)) + ' ' + (Math.abs(Math.atan(ylen / xlen)) < 1.2) + '  ' + isStart);
            }

            if (isStart) {
                onMove(swipeBase.move(moveX));

                e.preventDefault();
            }

        },
        onDown(e){
            // if(active&&active!==swipeBase)return false;

            // 保证滑动动作只激活此一个实例
            e.stopPropagation();

            return onDown(e);
        },
        onStart(e){

            if (isCancel)return;

            let touche = e.touches[0];

            startX = touche.pageX;
            startY = touche.pageY;

        },
        onEnd(e){
            if (isStart) {
                swipeBase.end({
                    swipeLeft,
                    swipeRight,
                    swipeNot
                });
                onEnd();
            }
            isCancel = isStart = false;
            // active=false;
        }
    });

}

