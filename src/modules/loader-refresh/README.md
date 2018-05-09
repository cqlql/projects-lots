
## 可控制颜色：特性 color

两个值：`'white'`、`'black'`。默认 `'black'`。


```html
<LoaderRefresh @loadData="loadData" color="white">
  <ul>
    <li v-for="(v,i) in list" :key="i">{{v}}</li>
  </ul>
</LoaderRefresh>
```
