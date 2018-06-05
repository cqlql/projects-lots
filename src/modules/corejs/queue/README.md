<!-- created on 2018/1/12 -->

# 队列

## 示例

队列1：第一个执行完再进行下一个，直到完成

```js
const queue = new Queue()
queue.excu(next => {
  setTimeout(function () {
    // 执行队列下一个
    // 失败将返回 false
    next()

  }, 1000)
})
```

队列2：

```js
const queueWait = new QueueWait
queueWait.add(function (params) {
  console.log(params === '可以传递参数') // true
})
queueWait.excu('可以传递参数') // 执行所有 add 的函数
queueWait.clear()
```
