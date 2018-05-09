const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('../../build/webpack.dev')(__dirname)

webpackConfig.entry.main.push('./src/data-mock_.js')
webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename: './record-ios.html',
    template: './src/index-ios.html',
  })
)

module.exports = require('../../build/friendly-error')(webpackConfig)
