const webpack = require('webpack')
const getDevConf = require('../../build/webpack.dev')
const docsConf = require('./w.docs.config.js')
const merge = require('webpack-merge')


module.exports = require('../../build/friendly-error')(merge(
  getDevConf({
    dirname: __dirname
    // splitCss: true,
  }),docsConf
))
