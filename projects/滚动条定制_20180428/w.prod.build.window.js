const path = require('path')
const webpack = require('webpack')
const getWebpackConfig = require('../../build/webpack.prod')
const merge = require('webpack-merge')

function resolve (p) {
  return path.resolve(__dirname, p)
}

let webpackConfig = getWebpackConfig({
  dirname: __dirname
})
delete webpackConfig.entry.main // 删掉默认入口
let conf = {
  mode: 'production',
  // devtool: 'source-map',
  watch: true,
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
