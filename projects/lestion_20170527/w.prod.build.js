const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompileEventsPlugin = require('../../build/compile-events-plugin')
const filterRemove = require('../../build/filter-remove')
const ScriptPlugin = require('../../build/script-plugin')
const merge = require('webpack-merge')
const getWebpackConfig = require('../../build/webpack.prod')

// 命令行参数
const argv = require('yargs').argv
// process.env.APP_TEST = argv['app-test'] === true
const isTest = argv['test'] === true // 有时候可能需要测试编译结果

const webpackConfig = getWebpackConfig(__dirname)

// 打包输出路径设置：
let outputPath = path.resolve(__dirname, './dist')
if (isTest) {
  // outputPath = path.resolve(__dirname, './dist')
}
// let outputPath = 'C:\\Users\\admin\\Desktop\\oa'

webpackConfig.module.rules.forEach(d => {
  // css 处理
  if (d.test.toString().indexOf('css') > -1) {
    // 拆分 css
    d.oneOf[0].use[0] = MiniCssExtractPlugin.loader
    d.oneOf[1].use[0] = MiniCssExtractPlugin.loader
  }
})

webpackConfig.plugins[0] = new HtmlWebpackPlugin({
  filename: './record.html',
  template: './src/index.html',
  inlineSource: /\.(js|css)$/,
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


// webpackConfig.plugins[0] = (new HtmlWebpackPlugin({
//   filename: './record-ios.html',
//   template: './src/index-ios.html',
//   inlineSource: /\.(js|css)$/,
//   minify: {
//     removeComments: true,
//     collapseWhitespace: true,
//     removeAttributeQuotes: true,
//     // 内嵌 css js 压缩, 结合 HtmlWebpackInlineSourcePlugin 可能会压缩2次，非必要还是不要设了
//     // minifyCSS: true,
//     // minifyJS: true

//     // more options:
//     // https://github.com/kangax/html-minifier#options-quick-reference
//   }
// }))


const prodConfig = {
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  plugins: [
    // 编译事件
    new CompileEventsPlugin({
      compile () {
        // 编译前删除
      },
      done () {
        // 编译后删除
        filterRemove(outputPath, /\.(js|css)$/)
      }
    }),
  ].concat(
    // 打包分析
    0 ? [(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)())] : []
  )
}

webpack(merge(webpackConfig, prodConfig), require('../../build/msg-webpack'))
