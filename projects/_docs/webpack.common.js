const webpack = require('webpack')
const marked = require('marked')
const renderer = new marked.Renderer()
// 代码高亮
// 所有语言
// const highlight = require('highlight.js')
// 指定语言
const hljs = require('highlight.js/lib/core.js')
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

const postcssConfig = require('../../postcss.config')
postcssConfig.plugins.pop() // 不要 rem

process.env.docs = true

module.exports = {
  rootPath: __dirname, // 如果是子项目则需要传
  // indexTemplate: null, // 不要默认的 index.html 模板
  // splitCss: true,
  // cache: false, // 关闭缓存 loader。如果css未改变，将不会触发拆分css，也不会插入link标签到 html 模板中，但开发环境很少去拆分css
  postcss: postcssConfig,
  webpack: {
    entry: {
      app: './src/main.js'
    },
    // output: {
    //   publicPath: '/'
    // },
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: false
              }
            },
            {
              loader: 'markdown-loader',
              options: {
                renderer
                /* your options here */
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // 文档环境变量
      new webpack.DefinePlugin({
        'process.env': {
          docs: JSON.stringify(process.env.docs + '')
        }
      })
    ]
  }
}
