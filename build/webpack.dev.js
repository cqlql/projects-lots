/* dev 用。因为使用的是默认的 devServer */
const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const getIPAdress = require('./get-ip-adress')
const getBaseConf = require('./webpack.base')
const merge = require('webpack-merge')

module.exports = function (dirname) {

  let baseConf = getBaseConf(dirname)

  baseConf.output.filename = baseConf.output.filename.replace(/chunkhash/, 'hash')
  // baseConf.module.rules.forEach(d => {
  //   // 普通 css 处理
  //   if (d.test.toString().indexOf('css') > -1) {
  //     // 普通 css 抽离处理：只是了解决延迟 bug：https://github.com/webpack-contrib/style-loader/pull/219
  //     // 发布版无需处理，等待官方解决
  //     d.use = ExtractTextPlugin.extract({
  //       fallback: 'style-loader',
  //       use: ['css-loader?sourceMap=true', 'postcss-loader?sourceMap=inline']
  //     })
  //   }
  // })

  let conf = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    output: {
      pathinfo: true,
    },
    plugins: [
      // new ExtractTextPlugin("style.css"),
      new webpack.HotModuleReplacementPlugin(), // 启用 hot
    ],
    devServer: {
      clientLogLevel: 'warning',// 去掉没必要的控制台输出。比如 hot 情况 --progress 浏览器控制台不再显示进度输出
      contentBase: path.resolve(dirname, 'dist'),
      compress: true,
      host: getIPAdress(),
      // port: 3002,
      // openPage: 'http://192.168.1.222',
      inline: true,
      hot: true,
      hotOnly: false
    }
  }

  return merge(baseConf, conf)
}
