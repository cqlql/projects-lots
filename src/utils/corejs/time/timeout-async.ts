
export default function (time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}
