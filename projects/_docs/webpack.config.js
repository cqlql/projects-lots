const getDevConf = require('../../build/webpack.dev')
const merge = require('webpack-merge')

module.exports = require('../../build/friendly-error')(merge(
  getDevConf({
    dirname: __dirname
    // splitCss: true,
  })
))
