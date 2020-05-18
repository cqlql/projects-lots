# 满屏加载

## 一般注册全局使用

```js
// 注册全局
import Loading from '@/components/loading/plugin'
Vue.use(Loading)

// 组件实例中使用
this.$loading.show() // 200ms延迟显示
this.$loading.show({ time: 400 }) // 400ms延迟显示
this.$loading.show({ time: 0 }) // 立即显示
this.$loading.show({ mask: true }) // 蒙层显示
this.$loading.hide()
```

## 延迟情况，也可避免重复点击

分两个阶段显示：

第一阶段，显示透明层，禁止点击

第二阶段，加载中出现
