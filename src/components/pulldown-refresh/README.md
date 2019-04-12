- [下拉刷新](#%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0)
  - [函数 load 说明](#%E5%87%BD%E6%95%B0-load-%E8%AF%B4%E6%98%8E)
- [下拉刷新 + 到底加载](#%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0--%E5%88%B0%E5%BA%95%E5%8A%A0%E8%BD%BD)
  - [函数 load 说明](#%E5%87%BD%E6%95%B0-load-%E8%AF%B4%E6%98%8E-1)
# 下拉刷新

## 函数 load 说明

需要加载时触发，说明滚动到底了

**必须是异步函数，或者返回 promise 也行**

`let status = load (page)`：

返回一个状态值 status ：
  - `'finish'` 缺省值。请求结束
  - `'noData'` 没有得到任何数据

# 下拉刷新 + 到底加载


## 函数 load 说明

需要加载时触发，说明滚动到底了

**必须是异步函数，或者返回 promise 也行**

`let status = load (page)`：

1. 返回一个状态值 status ：
  - `'continue'` 缺省值。表示还有下一页，继续检测是否到底
  - `'finish'` 彻底结束，再没有数据了
  - `'noData'` 没有得到任何数据
2. page 参数：当前需加载的页数
