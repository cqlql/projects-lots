# 双指捏合放大

## 使用示例

```js
import ZoomTouch from './zoom-touch.js'

// 1 直接指定一个放大元素
new ZoomTouch(elemZoom)

// 2 分别指定事件元素和放大元素
new ZoomTouch({
  elem: elemZoom,
  elemEvent: document, // 使用整个浏览器窗口作为事件范围
})
```

## 参数

| 参数      | 说明                             | 类型    | 默认值             |
| --------- | -------------------------------- | ------- | ------------------ |
| elem      | 放大元素                         | Element | -                  |
| elemEvent | 事件元素，指定拖动范围           | Element | elem, 使用放大元素 |
| isInit    | 是否更新坐标尺寸，操作前必须更新 | Boolean | true               |
