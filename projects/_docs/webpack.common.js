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

process.env.docs = true

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
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
