
## ajax-cache

针对只需要请求一次的接口，节省服务器资源

## ajax-comm

统一处理状态

```js
// 调用示例
import Vue from 'vue'
import axios from '@/modules/ajax/ajax-comm'
const loading = Vue.prototype.$loading
axios.loading = loading
```
