// require('webpack-dev-server/bin/webpack-dev-server');

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
webpackConfig.output.publicPath = '../'
webpackConfig.output.path = 'E:\\__admin\\Desktop\\svn-temp\\temp\\projects\\shengao'
webpackConfig.devServer.contentBase = 'E:\\__admin\\Desktop\\svn-temp\\temp\\projects\\shengao'
webpackConfig.devServer.hot = false
webpackConfig.module.rules.forEach(d => {
  if (d.loader && d.loader.indexOf('vue') > -1) {
    d.options.transformToRequire = {
      img: ''
    }
  }
})
// arr.pop();
// webpackConfig.output.path = 'E:\\__admin\\Desktop\\svn-temp\\temp\\projects\\shengao'
// webpackConfig.output.entry = {'js/[name].js'}
webpackConfig.output.filename = 'js/[name].js'
webpackConfig.output.chunkFilename = 'js/[name].bundle.js'
webpackConfig.watch = true
webpackConfig.plugins.splice(0, 1)
webpackConfig.plugins.pop()
webpack(webpackConfig, function (err, stats) {
  console.log(stats.toString({ colors: true }))
})
