const CleanPlugin = require('../../build/clean-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const webpackConfig = require('../../build/webpack.prod')(__dirname)
// let outputPath = webpackConfig.output.path = 'E:\\__admin\\Desktop\\英语单词挑战+圆周率挑战\\pi-train'
let outputPath = webpackConfig.output.path = 'E:\\__admin\\Desktop\\圆周率挑战\\pi-train'

webpackConfig.module.rules.forEach(d => {
  // if (d.loader === 'vue-loader') {
  //   d.options.extractCSS = true
  // }
  if (d.test.toString().indexOf('css') > -1) {
    d.use = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader']
    })
  }
})
webpackConfig.plugins.push(new ExtractTextPlugin("style.css"))
webpackConfig.plugins.push(new CleanPlugin({
  before: [outputPath],
  after: [outputPath + '/style.css']
}))

webpack(webpackConfig, function (err, stats) {
  console.log(stats.toString({ colors: true }))
})
