const webpackConfig = require('../../build/webpack.dev')(__dirname)
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

webpackConfig.module.rules.forEach(rule => {
  if (rule.loader === 'url-loader') {
    rule.options.limit = 1024 * 200
  }
})
webpackConfig.plugins.push(
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, 'src/imgs'),
      to: path.resolve(webpackConfig.output.path, 'imgs'),
    }
  ])
)
module.exports = require('../../build/friendly-error')(webpackConfig)
