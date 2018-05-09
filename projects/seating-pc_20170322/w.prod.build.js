const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompileEventsPlugin = require('../../build/compile-events-plugin')
const filterRemove = require('../../build/filter-remove')
const merge = require('webpack-merge')
const getWebpackConfig = require('../../build/webpack.prod')

const webpackConfig = getWebpackConfig(__dirname)

webpackConfig.plugins[0] = new HtmlWebpackPlugin({
  filename: './index.html',
  template: './src/index.html',
  // chunks: ['main'],
  inlineSource: /\.js$/,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    minifyCSS: true,
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
  }
})

// 打包输出路径设置：
let outputPath = webpackConfig.output.path

const prodConfig = {
  // devtool: 'source-map',
  plugins: [
    // 编译事件
    new CompileEventsPlugin({
      compile () {
        // 编译前删除
        // filterRemove(outputPath, /\.(jpg|js|ttf)$/)
      },
      done () {
        // 编译后删除
        // filterRemove(outputPath, /\.(css)$/)
        filterRemove(outputPath, /^js$/)
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(webpackConfig.output.path, 'static'),
      }
    ])
  ]
}

webpack(merge(webpackConfig, prodConfig), require('../../build/msg-webpack'))
