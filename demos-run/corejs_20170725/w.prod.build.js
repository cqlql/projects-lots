const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompileEventsPlugin = require('../../build/compile-events-plugin')
const filterRemove = require('../../build/filter-remove')
const ScriptPlugin = require('../../build/script-plugin')
const merge = require('webpack-merge')
const getWebpackConfig = require('../../build/webpack.prod')

const webpackConfig = getWebpackConfig(__dirname)

webpackConfig.plugins[0] = new HtmlWebpackPlugin({
  filename: './index.html',
  template: './src/index.html',
  // chunks: ['main'],
  inlineSource: /^js\/main.+js$/,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    // minifyCSS: true,
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
  }
})

// 打包输出路径设置：
let outputPath = webpackConfig.output.path

const prodConfig = {
  // devtool: 'source-map',
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter'
  },
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
    // 添加指定的 cdn 包。或者指定路径的包也行
    new ScriptPlugin([
      '/js/vue.min.js',
      // 'js/vue-router.min.js', // 配合 copy-webpack-plugin 使用
    ])
  ]
}

webpack(merge(webpackConfig, prodConfig), function () {
  require('../../build/msg-webpack')(...arguments)
  // 复制到 demos 目录
  require('E:/_work/cqlql.github.io-build/build/copy-demos--path/copy-demos.js')
})
