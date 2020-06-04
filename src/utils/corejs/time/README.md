
# 时间格式化

目前不处理小时分钟，用的情况不多。如果一定要，可以再写一个方法：format-datetime

yyyy 也没有做特殊处理，后期根据需求完善

```js
this.date1 = dateFormat('2017,1,2') // 2017-01-02
this.date2 = dateFormat('2017/1/3', 'yyyy-M-d') // 2017-1-3
this.date3 = dateFormat('2017/1/4/14/1', 'yyyy.MM.dd') // 2017.01.04
this.date4 = dateFormat('2017/1/5', 'yyyy/MM/dd') // 2017/01/05
this.date5 = dateFormat(new Date())
```
