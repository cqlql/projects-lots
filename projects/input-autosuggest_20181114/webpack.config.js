const merge = require('webpack-merge')
const webpackConfig = require('../../build/webpack.dev')(__dirname)
delete webpackConfig.entry.main // 删掉默认入口
const conf = {
  entry: { 'input-autosuggest': './src/input-autosuggest.window.js' }, // 更改 js 包文件名
  output: {
    library: 'InputAutosuggest',
    libraryTarget: 'window',
    libraryExport: 'default',
  },
}
module.exports = require('../../build/friendly-error')(merge(webpackConfig, conf))


