
- [polyfill 方案](#polyfill-%e6%96%b9%e6%a1%88)
- [CopyWebpackPlugin 常用配置](#copywebpackplugin-%e5%b8%b8%e7%94%a8%e9%85%8d%e7%bd%ae)
- [proxy 常用配置](#proxy-%e5%b8%b8%e7%94%a8%e9%85%8d%e7%bd%ae)
- [css module 使用](#css-module-%e4%bd%bf%e7%94%a8)
  - [css-loader 开启 module 方式](#css-loader-%e5%bc%80%e5%90%af-module-%e6%96%b9%e5%bc%8f)
  - [语法](#%e8%af%ad%e6%b3%95)
  - [现在可按需使用](#%e7%8e%b0%e5%9c%a8%e5%8f%af%e6%8c%89%e9%9c%80%e4%bd%bf%e7%94%a8)
- [将抽离的 css、js 包含进 html 文件](#%e5%b0%86%e6%8a%bd%e7%a6%bb%e7%9a%84-cssjs-%e5%8c%85%e5%90%ab%e8%bf%9b-html-%e6%96%87%e4%bb%b6)

## 新增环境变量

多个 DefinePlugin 使用 webpack3 webpack4 测试结论： 同名以第一次为准；不同命不影响，都会存在。

所以，新增新加一个 DefinePlugin 即可

```js
const webpackConfig = {
  plugins: [
    // 新增环境变量
    new webpack.DefinePlugin({
      'process.env': {
        APP_DEV: 'true'
      }
    })
  ]

}


## polyfill 方案

虽然已经按需 polyfill，但如果 src 中没使用 promise，node_modules 中有使用, 不支持 promise 的浏览器还是会报错，
比如动态 import() 就有对 promise 的使用，这种情况需手动引入
当然，正式项目肯定会用 promise，这里只是模板项目

```js
import 'core-js/modules/es6.promise.js'
```  


## CopyWebpackPlugin 常用配置

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpackConfig = {
  plugins: [
    // 在开启 devServer 情况，将 copy 到内存中
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.min.js'),
        to: path.resolve(outputPath, 'js/vue-router.min.js'),
      }
    ])

    // new CopyWebpackPlugin([
    //   {
    //     from: _resolve('static'),
    //     to: _resolve('dist/static'),
    //     ignore: ['.*'] // 排除
    //   }
    // ])
  ]

}

```
## proxy 常用配置

```js
const webpackConfig = {
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
      }
    }
  }
}
```

## css module 使用

### css-loader 开启 module 方式

开启后，文件中的所有 className 将替换成变成唯一


**webpack.config.js**

```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    }
  ]
}
```

### 语法

**由文件划分模块**

文件 a.css 中相同的 className 编译后依然相同

文件 a.css 与 b.css 中 className 即使有相同，编译后不一样

**不转换**

```css
:global .cf { clear: both; }
```

### 现在可按需使用

main.js

```js
// 模块化导入
import '/main.css?module'
```

## 将抽离的 css、js 包含进 html 文件

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('HtmlWebpackInlineSourcePlugin')
const webpackConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      inlineSource: /app\.js|styles.css/, // 要包含的 js css
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // 内嵌 css js 压缩, 结合 HtmlWebpackInlineSourcePlugin 可能会压缩2次，非必要还是不要设了
        // minifyCSS: true,
        // minifyJS: true

        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
    // 将抽离的 css、js 包含进 html 文件
    new HtmlWebpackInlineSourcePlugin(),
  ],
}
```

## mock-server 使用

### 文件上传

```js
// 文件上传
const multer = require('multer')
const upload = multer({ dest: 'e:/uploads/' })
router.post('/file', upload.single('file'), function (req, res) {
  res.send({
    'status': 200,
    'message': 'ok',
    'result': {}
  })
})
```

### get 参数
通过 `req.query` 获取

### post 参数
通过 `req.body` 获取


## ts 支持

### 相关包
-- 核心，如果不需要支持vue，只需要安装如下  
typescript  
@babel/preset-typescript - ts核心支持  
@babel/plugin-proposal-class-properties - 类支持  
@babel/plugin-proposal-decorators - 装饰器支持  
fork-ts-checker-webpack-plugin - ts单独进程语法检查  

-- 此环境需要的 types  
@types/webpack-env  
@types/core-js  

-- eslint 相关  
@typescript-eslint/eslint-plugin  
@typescript-eslint/parser  

-- vue相关  
vue-class-component - 类支持  
vue-property-decorator - 装饰器支持  
vue-tsx-support - tsx增强支持，让编译检查通过  
vuex-class - vuex ts类支持



### babel.config.js

只比js编译多了3处

```js
module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'modules': false,
      'useBuiltIns': 'usage',
      'corejs': '^2.6.5',
      'targets': {
        'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8']
      }
    }],
    ['@vue/babel-preset-jsx'],

    // ts 转换核心
    ['@babel/preset-typescript', {
      'isTSX': true,
      'allExtensions': true
    }]

  ],
  'plugins': [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',

    // ts 类属性支持
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    // ts 装饰器支持
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ]
}

```

### eslint

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: ['@typescript-eslint'],
  // Prerequisite `eslint-plugin-vue`, being extended, sets
  // root property `parser` to `'vue-eslint-parser'`, which, for code parsing,
  // in turn delegates to the parser, specified in `parserOptions.parser`:
  // https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // https://typescript-eslint.io/parser
    'no-undef': 'off',

    // 'no-unused-vars': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/issues/46
    '@typescript-eslint/no-unused-vars': 'error',

    // temporary fix for https://github.com/vuejs/vue-cli/issues/1922
    // very strange as somehow this rule gets different behaviors depending
    // on the presence of @typescript-eslint/parser...
    'strict': 'off'
  }
}
```

### ts语法检查插件 - fork-ts-checker-webpack-plugin

消息被挤到前面看不见问题解决：
将 friendly-errors-webpack-plugin 插件放到 fork-ts-checker-webpack-plugin 后面即可
