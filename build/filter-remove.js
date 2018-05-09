/**
 * 正则过滤删
 * 支持文件，文件夹
 * 指定目录查找，不查找子级
 *
 * filterRemove(path.resolve(__dirname, './files'), /\.(jpg|png)$/) // 删除指定
 */
const fs = require('fs-extra')
const path = require('path')

module.exports = function filterRemove (dir, condition) {
  try {
    let dirList = fs.readdirSync(dir)
    dirList.forEach((name) => {
      if (condition.test(name)) {
        fs.removeSync(path.resolve(dir, name))
      }
    })
  } catch (e) {
  }
}
