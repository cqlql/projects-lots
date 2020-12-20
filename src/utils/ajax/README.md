
## ajax-cache

针对只需要请求一次的接口，节省服务器资源

## ajax-comm

统一处理状态

```js
// 调用示例
// 最好在入口 main.js 中初始 loading 设置
import Vue from 'vue'
import ajax from '@/utils/ajax/ajax-comm'
const loading = Vue.prototype.$loading
// 指定 loading
ajax.loading = loading
// 指定错误消息输出。默认 console.error
ajax.messageError = function (msg) {}
```
