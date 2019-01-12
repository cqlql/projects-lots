const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompileEventsPlugin = require('../../build/compile-events-plugin')
const filterRemove = require('../../build/filter-remove')
const ScriptPlugin = require('../../build/script-plugin')
const merge = require('webpack-merge')
const getWebpackConfig = require('../../build/webpack.prod')

// 命令行参数
const argv = require('yargs').argv
const isTest = argv['test'] === true // 有时候可能需要测试编译结果

const webpackConfig = getWebpackConfig({
  dirname: __dirname,
  // css 拆分
  splitCss: false,
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
    // 去掉 index template
    // function Empty () {}
    // Empty.prototype.apply = function () {}
    // return new Empty()

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
        minifyCSS: true,
        // minifyJS: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  },
  cssLoaderHandle (cssLoader) {
    cssLoader.oneOf[0].oneOf[0].use[1].options.url = (url) => {
      return url.includes('none.png')
    }
    return cssLoader
  }
})

webpackConfig.module.rules.forEach(rule => {
  if (rule.loader === 'url-loader') {
    rule.options.limit = 1024 * 200
  }
})

// 打包输出路径设置：
let outputPath = path.resolve(__dirname, './dist')
if (isTest) {

}

// delete webpackConfig.entry.main // 删掉默认入口
const prodConfig = {
  // entry: { 'input-autosuggest': './src/input-autosuggest.window.js' }, // 更改 js 包文件名
  // 不打包的模块
  // 键为 import 调用名，值为全局名称
  externals: {
    'vue': 'Vue'
    // 'vue-router': 'VueRouter'
  },
  // output: {
  //   path: outputPath,

  //   library: 'jsLib',
  //   libraryTarget: 'window',
  //   libraryExport: 'default',
  // },
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
        filterRemove(outputPath, /(js)$/)
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/imgs'),
        to: path.resolve(webpackConfig.output.path, 'imgs'),
        ignore: ['1.png', '2.png']
      }
    ]),
    // 添加指定的 cdn 包。或者指定路径的包也行
    new ScriptPlugin([
      'http://style.shenduxuetang.com/vue/2.5.21/vue.runtime.min.js',
      // 配合 copy-webpack-plugin 使用
      // 'js/vue-router.min.js',
    ])
  ].concat(
    // 打包分析
    0 ? [(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)())] : []
  )
}

webpack(merge(webpackConfig, prodConfig), require('../../build/msg-webpack'))
