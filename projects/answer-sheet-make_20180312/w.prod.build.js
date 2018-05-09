const webpack = require('webpack')
const webpackConfig = require('../../build/webpack.prod')(__dirname)
webpack(webpackConfig, require('../../build/msg-webpack'))
