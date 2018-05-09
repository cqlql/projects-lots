const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = require('../../build/webpack.prod')(__dirname)

webpackConfig.plugins[0] = new HtmlWebpackPlugin({
  filename: './chart-pie.html',
  template: './src/index.html',
  // chunks: ['main'],
  inlineSource: /\.(css|.+\.js)$/,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    // 内嵌 css js 压缩, 结合 HtmlWebpackInlineSourcePlugin 可能会压缩2次，非必要还是不要设了
    // minifyCSS: true,
    // minifyJS: true

    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
  }
})
webpack(webpackConfig, require('../../build/msg-webpack'))
