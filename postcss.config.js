module.exports = {
  plugins: [
    // require('./build/postcss-iconfont')({
    //   disable: process.env.NODE_ENV === 'production'
    // }),
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: [
        '>0.5%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9',
      ],
      flexbox: 'no-2009',
      remove: false
    }),
    require('postcss-nested'),
  ].concat(process.env.NODE_ENV === 'production'? [
    // require('postcss-pxtorem')({
    //   // replace: process.env.NODE_ENV === 'production', // 默认 true
    //   rootValue: 100,
    //   propList:['*'],
    //   selectorBlackList:[/^html$/]
    // })
  ] : [])
}

/* 说明
module.exports = {
  plugins: [
    // 未来语法：calc 运算
    require('postcss-calc'),
    // 未来语法：@apply 代码块支持
    require('postcss-apply'),
    // 未来语法：允许变量。只限 :root
    require('postcss-custom-properties'),
    // 非未来语法：允许任何地方使用未来语法变量
    require('postcss-css-variables'),
    // 未来 css 语法，插件集合(postcss-custom-properties、postcss-calc、autoprefixer、postcss-apply)
    require('postcss-cssnext')({
      browsers:["last 10 versions",'Firefox < 20','ie 10'],
      autoprefixer:{
        remove: false
      }
    }),

    // 允许 css 中使用 @import 导入合并其他css
    require('postcss-smart-import')({
      // 查找目录
      path: ['E:/_work/mobile_webview/smallpitch.webview/src/modules/base-libs/css']
    }),

    // 允许单行注释
    require('postcss-inline-comment'),

    // 自己写的插件。给 @font-face 中双斜杠加 http:
    require('./build/postcss-iconfont')({
      disable: process.env.NODE_ENV === 'production'
    }),
    // 自动加前缀
    require('autoprefixer')({
      // 是否自动删除错误代码
      // 会删除部分 ie 特有语法，所以还是禁掉吧
      remove: false
    }),
    // 支持嵌套
    require('postcss-nested'),

  ].concat(process.env.NODE_ENV === 'production'? [ // 正式环境使用
    // px 转 rem
    require('postcss-pxtorem')({
      // replace: process.env.NODE_ENV === 'production', // 默认 true。即不保留 px
      rootValue: 100,
      propList:['*'],
      selectorBlackList:[/^html$/]
    })
  ] : [])
}
 */
