const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompileEventsPlugin = require('./build/compile-events-plugin')
const filterRemove = require('./build/filter-remove')
const ScriptPlugin = require('./build/script-plugin')
const merge = require('webpack-merge')
const getWebpackConfig = require('./build/webpack.prod')

// 命令行参数
const argv = require('yargs').argv
const isTest = argv['test'] === true // 有时候可能需要测试编译结果

const webpackConfig = getWebpackConfig({
  dirname: __dirname,
  // css 拆分
  splitCss: true,
  // 更改环境变量
  // env () {
  //   return new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('production'),
  //       APP_TEST: JSON.stringify(isAppTest + '')
  //     }
  //   })
  // },
  // 更改入口 index template
  indexTemplate () {
    return new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      // chunks: ['main'],
      inlineSource: /main\.js/,
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
  }
})

// 打包输出路径设置：
let outputPath = path.resolve(__dirname, './dist')
if (isTest) {

}

const prodConfig = {
  // 不打包的模块
  // 键为 import 调用名，值为全局名称
  externals: {
    'vue': 'Vue'
    // 'vue-router': 'VueRouter'
  },
  output: {
    path: outputPath
  },
  plugins: [
    // 转 .net 的 cshtml 模板
    // new (require('./build/cshtml-plugin.js'))(),

    // 编译事件
    new CompileEventsPlugin({
      compile () {
        // 编译前删除
        // filterRemove(outputPath, /\.(jpg|js|ttf)$/)
        // filterRemove(outputPath, /^js$/)
        // filterRemove(outputPath, /\.(css|map)$/)
      },
      done () {
        // 编译后删除
        // filterRemove(outputPath, /\.(css)$/)
        // filterRemove(outputPath + '/static', /\.(js|css)$/)
      }
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.min.js'),
    //     to: path.resolve(outputPath, 'js/vue-router.min.js'),
    //   }
    // ]),
    // 添加指定的 cdn 包。或者指定路径的包也行
    new ScriptPlugin([
      'http://p2y63v1s4.bkt.clouddn.com/vue/2.5.13/vue.min.js',
      // 配合 copy-webpack-plugin 使用
      // 'js/vue-router.min.js',
    ])
  ].concat(
    // 打包分析
    isTest ? [(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)())] : []
  )
}

webpack(merge(webpackConfig, prodConfig), require('./build/msg-webpack'))
