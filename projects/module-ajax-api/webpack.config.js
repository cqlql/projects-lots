const merge = require('webpack-merge')
const webpackConfig = require('../../build/webpack.dev')(__dirname)
delete webpackConfig.entry.main // 删掉默认入口
const conf = {
  entry: { 'ajax-api': './src/ajax-api/index.js' }, // 更改 js 包文件名
  output: {
    library: 'ajaxApi',
    libraryTarget: 'window',
    libraryExport: 'default',
  },
  devServer: {
    // proxy 文档：https://github.com/chimurai/http-proxy-middleware
    proxy: [{
      context: ['/pi/v1', '/comm/v1'],
      target: `http://192.168.1.162:8086`,
      // pathRewrite: {
      //   '^/mock': ''
      // },

      // 注意以下的自定义无法在浏览器端看到，因为是通过nodejs去请求的，而不是浏览器。所以只能在服务端看到

      // 允许服务端重定向
      followRedirects: true,
      // 重写 host。以 target 重写
      changeOrigin: true,
      // 直接修改 headers
      // headers: {
      //   Cookie: 'ASP.NET_SessionId=nwlyo2azpq3zhimw4vgz0fqo; .ASPXAUTH=',
      //   Host: '192.168.1.110:8787',
      //   Origin: 'http://192.168.1.110:8787',
      //   'Upgrade-Insecure-Requests': 1,
      //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
      // }
    },
    {
      context: ['online'],
      target: `https://api.shendupeiban.com`,
      // pathRewrite: {
      //   '^/mock': ''
      // },

      // 注意以下的自定义无法在浏览器端看到，因为是通过nodejs去请求的，而不是浏览器。所以只能在服务端看到

      // 允许服务端重定向
      followRedirects: true,
      // 重写 host。以 target 重写
      changeOrigin: true,
      // 直接修改 headers
      // headers: {
      //   Cookie: 'ASP.NET_SessionId=nwlyo2azpq3zhimw4vgz0fqo; .ASPXAUTH=',
      //   Host: '192.168.1.110:8787',
      //   Origin: 'http://192.168.1.110:8787',
      //   'Upgrade-Insecure-Requests': 1,
      //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
      // }
    }]
  },
}

module.exports = require('../../build/friendly-error')(merge(webpackConfig, conf))
