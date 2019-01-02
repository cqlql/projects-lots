
## 这是针对 body 滚动条的下拉刷新


## 内容太少，高度不够解决方案

通过js计算一个最小高度，见 Demo.vue 源码




## 优化记录

### 20181211

1. 向下拖动 y 为 0，states 更正为 0，之前只要拖动都为 1
2. y 为 0 transform 设为 none，解决 fiexd 以 transform 为参照的一些问题
