const webpackConfig = require('../../build/webpack.dev')(__dirname)
module.exports = require('../../build/friendly-error')(webpackConfig)
