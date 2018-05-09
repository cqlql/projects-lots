/* dev 用。因为使用的是默认的 devServer */
let path = require('path')
let webpack = require('webpack')
let getIPAdress = require('../../build/get-ip-adress')
let baseConf = require('./webpack.base')
let merge = require('webpack-merge')

baseConf.output.filename = baseConf.output.filename.replace(/chunkhash/, 'hash')
// baseConf.entry.main.unshift('./build/dev-client.js')

let conf = {
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用 hot
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    // host: '192.168.1.222',
    host: getIPAdress(),
    port: 3001,
    // openPage: 'http://192.168.1.222',
    inline: true,
    hot: true,
    hotOnly: false,
    proxy: [{
      context: ["/Content"],
      target: "http://192.168.1.222:3003"
    }]
  }
}

module.exports = merge(baseConf, conf)
