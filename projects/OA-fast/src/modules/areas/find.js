export default function (arr, id) {
  id *= 1
  for (let i = arr.length, t; i--;) {
    t = arr[i]
    if (t.id === id) {
      return t
    }
  }
}
