
# 一次加载器

保证只加载一次的懒加载，并保留值

特别适用于不是必须用到的一些大型js库，比如 ckeditor,echart

```js
import LoadOnce from '@/modules/corejs/load-once2'
import scriptLoad from '@/modules/corejs/dom/script-load'
const ckeditor = await ckeditorLoadOnce.load(async () => {
  await scriptLoad('https://style.shenduxuetang.com/ckeditor/4.11.1/ckeditor.js')
  await scriptLoad('https://style.shenduxuetang.com/ckeditor/4.11.1/config.js')
  return window.CKEDITOR
})
console.log(ckeditor)
```
