
## 一般注册全局使用

```js
// 注册全局
import Toast from '@/components/toast/plugin'
Vue.use(Toast)

// 组件实例中使用
this.$toast('普通消息')
this.$toast.success('成功提醒')
this.$toast.error('错误消息')
```