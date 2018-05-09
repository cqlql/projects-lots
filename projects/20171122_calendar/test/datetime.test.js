
// import Vue from 'vue'
// import MyComponent from '../src/App.vue'
import Datetime from '../src/modules/datetime'
let datetime = new Datetime()
// 这里是一些 Jasmine 2.0 的测试，你也可以使用你喜欢的任何断言库或测试工具。
describe('datetime class 测试', () => {

  it('根据日期返回一个星期的日期', (done) => {
    // 当前年上一月
    expect(datetime.getWeekDate('2017/11/2')[0].value).to.equal('2017/10/30')
    console.log(datetime.getWeekDate('2017/11/11'))
    // 当前年
    console.log(datetime.getWeekDate('2017/11/11')[0].value)
    console.log(datetime.getWeekDate('2017/11/12')[0].value)
    console.log(datetime.getWeekDate('2017/11/25')[0].value)

    // 当前年下一月
    console.log(datetime.getWeekDate('2017/11/29')[6].value)

    // 有下一年情况
    expect(datetime.getWeekDate('2016/12/29')[6].value).to.equal('2017/1/1')
    // 有上一年情况
    expect(datetime.getWeekDate('2017/1/1')[0].value).to.equal('2016/12/26')
  })
})
