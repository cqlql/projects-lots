/**
 * 数位补0
 * 目前只处理2位
 * */
export default function numFill(number, len) {

  if (len === 2) {
    if (number < 10) {

      return '0' + number;
    }
  }

  return number;

}
