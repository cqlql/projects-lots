

## css module 使用
webpack css modules

开启后，文件中的所有 className 将替换成变成唯一

**由文件划分模块**

文件 a.css 相同 className 替换后依然相同

文件 a.css 与 b.css 中 className 即使有相同，替换后不一样

**不转换**

```css
:global .cf { clear: both; }
```

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

### 20180501 ---- 新方式

main.js

```js
// 模块化导入
import '/main.css?module'
```

**webpack.config.js**

```js

```
