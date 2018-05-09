
const findRemove = require('./find-remove')
const path = require('path')

// findRemove(path.resolve(__dirname, './files'), /./) // 删除所有
findRemove(path.resolve(__dirname, './files'), /\.(jpg|png)$/) // 删除指定
