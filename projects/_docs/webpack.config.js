const getDevConf = require('../../build/webpack.dev')
const merge = require('webpack-merge')
const marked = require("marked");
const renderer = new marked.Renderer();

// 代码高亮
// 所有语言
// const highlight = require('highlight.js')
// 指定语言
const hljs = require('highlight.js/lib/highlight.js')
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

module.exports = require('../../build/friendly-error')(merge(
  getDevConf({
    dirname: __dirname
    // splitCss: true,
  }),
  {
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
    }
  }
))
