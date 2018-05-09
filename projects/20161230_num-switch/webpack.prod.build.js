const webpack = require('webpack')
const webpackConfig = require('../../build/webpack.prod')(__dirname)
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let getIPAdress = require('../../build/get-ip-adress')
function resolve (p) {
  return path.resolve(__dirname, p)
}
// webpackConfig.plugins.push(
//   new HtmlWebpackPlugin({
//     filename: './index.html',
//     template: './src/index.html',
//     chunks: ['main']
//   })
// )
webpackConfig.watch = true
webpackConfig.module.rules.forEach(d => {
  if (d.loader === 'babel-loader') {
    d.include.push(resolve('../../modules'))
  }
})
webpackConfig.resolve.alias['@'] = resolve('./src')
// webpackConfig.output.path = 'E:\\_work\\new-year\\Math'
webpackConfig.output.filename = 'js/random.js'

webpack(webpackConfig, function (err, stats) {
  console.log(stats.toString({ colors: true }))
})
