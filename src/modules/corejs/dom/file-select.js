/**
 * 错误类型，待扩展
 * 0 大小超出
 */
export default function ({
  onError = () => {},
  accept = '*', // 'image/*'
  fileSizeLimit // 最大大小，M
} = {}) {
  return new Promise((resolve, reject) => {
    let file = document.createElement('input')
    file.type = 'file'
    file.accept = accept

    // 移动端 file 元素必须加到页面中
    file.style.display = 'none'
    document.body.appendChild(file)

    file.onchange = () => {
      let f = file.files[0]
      if (fileSizeLimit && f.size > fileSizeLimit * 1024 * 1024) {
        let err = new Error(`文件须小于${fileSizeLimit}M`)
        onError(err, 0)
        reject(err)
        return
      }
      resolve(f)
      file.remove()
    }
    file.click()
  })
}
