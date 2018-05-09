
## 弹窗放大 elem-zoom-popup

### 说明
不会对原来的元素造成影响，会复制一份新的元素进行放大

### 语法

```
elemZoomPopup(elem, css, function created(elem, elemz){

})
```

### 参数
- elem 放大的图片或者元素
- css 设置容器 css
- created 弹窗前操作
  - elem 容器
  - elemz 传入的放大元素

### 图片

需保证图片尺寸可获取

```js
elemZoomPopup(img)
```

### 元素
```js
elemZoomPopup(elem)
```
