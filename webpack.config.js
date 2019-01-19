
/* eslint comma-dangle: "off" */
const getDevConf = require('./build/webpack.dev')
const merge = require('webpack-merge')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const ScriptPlugin = require('./build/script-plugin')

const conf = {
  devServer: {
    // proxy 文档：https://github.com/chimurai/http-proxy-middleware
    proxy: [{
      context: ['/mock'],
      target: `http://${require('./build/get-ip-adress')()}:3003`,
      pathRewrite: {
        '^/mock': ''
      },

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
  externals: {
    'vue': 'Vue'
    // 'vue-router': 'VueRouter'
  },
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.min.js'),
    //     to: path.resolve(outputPath, 'js/vue-router.min.js'),
    //   }
    // ]),
    // 添加指定的 cdn 包。或者指定路径的包也行
    new ScriptPlugin([
      'http://style.shenduxuetang.com/vue/2.5.22/vue.runtime.js',
      // 配合 copy-webpack-plugin 使用
      // 'js/vue-router.min.js',
    ]),
  ]

}
// 如果webpack配置有问题，需把 require('./build/friendly-error') 去掉才能看到错误
module.exports = require('./build/friendly-error')(
  merge(
    getDevConf({
      // dirname: __dirname, // 如果是子项目则需要传
      // splitCss: true,
    }),
    conf
  )
)
