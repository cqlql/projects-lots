const webpack = require('webpack')
const webpackConfig = require('../../build/webpack.prod')(__dirname)
webpackConfig.output.publicPath = '../'
webpackConfig.output.path = 'E:\\__admin\\Desktop\\svn-temp\\temp\\projects\\shengao'
// webpackConfig.output.entry = {'js/[name].js'}
webpackConfig.output.filename = 'js/[name].js'
webpackConfig.output.chunkFilename = 'js/[name].bundle.js'
webpackConfig.watch = true
webpackConfig.plugins.splice(0, 1)
webpackConfig.module.rules.forEach(d => {
  if (d.loader && d.loader.indexOf('vue') > -1) {
    d.options.transformToRequire = {
      img: ''
    }
  } else if (d.test.toString().indexOf('css') > -1) { // 普通 css 处理
    // 或者 只去掉 sourceMap
    d.use = ['style-loader', 'css-loader', 'postcss-loader']
  }
})
webpack(webpackConfig, function (err, stats) {
  console.log(stats.toString({ colors: true }))
})
