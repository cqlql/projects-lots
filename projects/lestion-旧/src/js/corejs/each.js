/**
 * each
 *
 * */
export default function each(obj, fn) {
  var
    key,
    len = obj.length;

  if (len === undefined) {
    for (key in obj) {
      if (fn(key, obj[key]) === false) {
        break;
      }
    }
  }
  else {
    for (key = 0; key < len; key++) {
      if (fn(key, obj[key], len) === false) {
        break;
      }
    }
  }
}

