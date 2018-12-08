import load from './load'
export default function (urls) {
  return new Promise((resolve, reject) => {
    let i = 0
    function excu () {
      let url = urls[i]
      if (url === undefined) {
        // 完成
        resolve()
        return
      }
      load(urls[i]).then(() => {
        // 加载失败这里将不会执行
        i++
        excu()
      })
    }
    excu()
  })
}
