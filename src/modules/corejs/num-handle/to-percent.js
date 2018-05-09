
/**
 * 百分数转换
 * 解决js中浮点运算问题： 0.57*100=56.99999999999999
 *
 * @param {number|string} num
 * @return {number}
 * */
export default function toPercent (num, len = 1) {
  return num && (num * 100).toFixed(len) * 1
  // return (num + '00').replace(/\.([\d]{2})/, '$1.') * 1;
}
