const webpack = require('webpack')
const webpackConfig = require('../../build/webpack.prod')(__dirname)
webpack(webpackConfig, function (err, stats) {
  console.log(stats.toString({ colors: true }))
})
