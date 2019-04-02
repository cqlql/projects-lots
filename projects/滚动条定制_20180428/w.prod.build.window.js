const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getWebpackConfig = require('../../build/webpack.prod')
const merge = require('webpack-merge')

function resolve (p) {
  return path.resolve(__dirname, p)
}

let webpackConfig = getWebpackConfig({
  dirname: __dirname,
  indexTemplate () {
    return new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      // chunks: ['main'], // 指定引入的js包，只有main情况可忽略
      // inlineSource: /main\.js/,
      // inlineSource: /styles\.bundle\.js/,
      // inlineSource: /(styles\.bundle\.js|main\.js)/,
      minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // removeAttributeQuotes: true,
        // 内嵌 css js 压缩, 结合 HtmlWebpackInlineSourcePlugin 可能会压缩2次，非必要还是不要设了
        // minifyCSS: true,
        // minifyJS: true

        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  }
})
delete webpackConfig.entry.main // 删掉默认入口
let conf = {
  mode: 'production',
  // devtool: 'source-map',
  // watch: true,
  entry: {
    customScroll: ['./src/customScroll.window.js']
  },
  output: {
    path: resolve('./dist'),
    // path: 'E:\\_work\\asp_net\\sd.plamclass.com.v2\\sd.plamclass.com\\SD.PalmClass.Web\\Content\\Scripts\\rule',
    filename: '[name].js',
    library: 'customScroll',
    libraryTarget: 'window'
  },
  externals: { 'vue': 'Vue' },
  // 将所有css，包括异步包中的css，全部打包到一个文件
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
}

webpack(merge(webpackConfig, conf), require('../../build/msg-webpack'))
