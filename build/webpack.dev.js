/* eslint comma-dangle: "off" */
/* dev 用。因为使用的是默认的 devServer */
const path = require('path')
const webpack = require('webpack')
const getIPAdress = require('./get-ip-adress')
const getCommConf = require('./webpack.base')
const merge = require('webpack-merge')

// dirname 项目所在目录
module.exports = function (options) {
  let conf = {
    mode: 'development',
    // 拆分后需使用 'source-map' css 才能正确定向。需使用 devtool: 'source-map'
    devtool: options.splitCss ? 'source-map' : 'cheap-module-eval-source-map',
    // devtool: 'source-map',
    watch: true,
    output: {
      pathinfo: true,
      filename: 'js/[name].js?_=[hash:7]',
      chunkFilename: 'js/[name].bundle.js?_=[hash:7]',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // 启用 hot
    ],
    devServer: {
      clientLogLevel: 'warning', // 去掉没必要的控制台输出。比如 hot 情况 --progress 浏览器控制台不再显示进度输出
      contentBase: path.resolve(options.dirname || __dirname, 'dist'),
      compress: true,
      host: getIPAdress(),
      // port: 3002,
      // openPage: 'http://192.168.1.222',
      inline: true,
      hot: true,
      hotOnly: false
    }
  }

  return merge(
    getCommConf(options),
    conf
  )
}
