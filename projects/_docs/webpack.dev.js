
/* eslint comma-dangle: "off" */
const merge = require('webpack-merge')
const getDevConf = require('../../build/webpack.dev')
const docsConf = require('./webpack.common.js')
const conf = {
  devServer: {
    // 相关 文档：
    // https://github.com/chimurai/http-proxy-middleware
    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    proxy: {
      '/mock': {
        target: `http://${require('ip').address()}:3003`,
        pathRewrite: {
          '^/mock': ''
        },
        followRedirects: true, // 允许服务端重定向
        changeOrigin: true,
        hostRewrite: true,
      }
    }
  }
}
module.exports = getDevConf({
  ...docsConf,
  // friendlyError: false, // 开启定制的控制台消息，默认true。某些配置错误可能看不到，这种情况需关闭
  webpack: merge(docsConf.webpack, conf)
})
