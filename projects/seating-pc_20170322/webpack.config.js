const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackConfig = require('../../build/webpack.dev')(__dirname)
webpackConfig.plugins.push(
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, 'static'),
      to: path.resolve(webpackConfig.output.path, 'static'),
    }
  ])
)
module.exports = require('../../build/friendly-error')(webpackConfig)
