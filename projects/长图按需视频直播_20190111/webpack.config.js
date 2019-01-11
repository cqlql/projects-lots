const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpackConfig = require('../../build/webpack.dev')({
  dirname: __dirname,
  cssLoaderHandle (cssLoader) {
    cssLoader.oneOf[0].oneOf[0].use[1].options.url = (url) => {
      return url.includes('./imgs/none.png')
    }
    return cssLoader
  }

})
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
