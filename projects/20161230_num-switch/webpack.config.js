let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = require('../../build/webpack.dev')(__dirname)
let getIPAdress = require('../../build/get-ip-adress')
function resolve (p) {
  return path.resolve(__dirname, p)
}
webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename: './index.html',
    template: './src/index.html',
    chunks: ['main']
  })
)
webpackConfig.module.rules.forEach(d => {
  if (d.loader === 'babel-loader') {
    d.include.push(resolve('../../modules'))
  }
})
webpackConfig.resolve.alias['@'] = resolve('../../../src')
module.exports = webpackConfig
