# 满屏加载

## 使用示例

```js
import loading from '@/modules/loading'
loading.show() // 200ms延迟显示
loading.show({ time: 0 }) // 立即显示
loading.show({ mask: true }) // 蒙层显示
loading.hide()
```

## 延迟情况，也可避免重复点击

分两个阶段显示：

第一阶段，显示透明层，禁止点击

第二阶段，加载中出现
