const friendlyError = require('../../build/friendly-error')
const webpackConfig = require('../../build/webpack.dev')(__dirname)
module.exports = friendlyError(webpackConfig)
