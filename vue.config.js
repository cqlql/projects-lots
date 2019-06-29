// const path = require('path')
// const webpack = require('webpack')
const conf = {
  // pages: {
  //   index: {
  //     entry: 'src/main.js'
  //   }
  // },
  // outputDir: 'dist/oa',
  publicPath: '',
  productionSourceMap: false,
  css: {
    extract: false,
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...

      // 新增插件
      // config.plugins = [
      //   ...config.plugins,
      //   new webpack.NamedModulesPlugin()
      // ]
      // 去掉压缩
      // config.optimization.minimizer = []
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // 取消 eslint
    const eslint = config.module.rule('eslint')
    eslint.uses.clear()

    // url-loader css @
    // config.resolve
    //   .alias
    //   .set('./@', path.resolve(__dirname, 'src'))

    // 修改环境变量
    // config.plugin('define')
    //   .tap(options => {
    //     options[0]['process.env'].temp_data_handle = 'true'
    //     return options
    //   })

    // 删除插件
    // config.plugins.delete('hash-module-ids')

    // 新增插件
    // config.plugin('named-modules').use(new webpack.NamedModulesPlugin()) // 路径作为模块名，测试用
  },
  devServer: {
    proxy: {
      '/8186': {
        target: 'http://192.168.1.162:8186',
        secure: true,
        pathRewrite: {
          '^/8186': ''
        }
      },
      '/164': {
        target: 'http://192.168.1.164:8086',
        secure: true,
        pathRewrite: {
          '^/164': ''
        }
      },
      '/162': {
        target: 'http://192.168.1.162:8086',
        pathRewrite: {
          '^/162': ''
        }
      },
      '/api': {
        target: 'http://192.168.1.183:8095',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mock': {
        target: `http://${require('ip').address()}:3003`,
        pathRewrite: {
          '^/mock': ''
        }
      },
      '/online': {
        target: 'https://api.shendupeiban.com',
        pathRewrite: {
          '^/online': ''
        },

        // 注意以下的自定义无法在浏览器端看到，因为是通过nodejs去请求的，而不是浏览器。所以只能在服务端看到

        // 允许服务端重定向
        followRedirects: true,
        // 重写 host。以 target 重写
        changeOrigin: true
        // 直接修改 headers
        // headers: {
        //   Cookie: 'ASP.NET_SessionId=nwlyo2azpq3zhimw4vgz0fqo; .ASPXAUTH=',
        //   Host: '192.168.1.110:8787',
        //   Origin: 'http://192.168.1.110:8787',
        //   'Upgrade-Insecure-Requests': 1,
        //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
        // }
      }
    }
  }
}
module.exports = conf
