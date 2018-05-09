<template>
  <SlideSelect ref="vSlideSelect"/>
</template>

<script>
import SlideSelect from '@/modules/slide-select2/SlideSelect'
import DateHandle from '@/modules/slide-select-date/date-handle'
export default {
  created () {
    this.dateHandle = new DateHandle()
  },
  methods: {
    show ({selectedValues, selectedValuesObj, onConfirm, onChange}) {
      // let that = this
      let nowDate = this.getNowDate()
      let nowYear = nowDate.year
      let nowBaseDate = nowDate.date

      let {dateHandle} = this
      // 设置年范围
      dateHandle.setYearRange(nowYear, nowYear + 3)
      // 年月列表数据
      let dateData

      if (selectedValuesObj) {
        let d = selectedValuesObj
        dateData = this.getData(new Date(d[0].value, d[1].value + 1, d[2].value, d[3].value, d[4].value))
      } else {
        selectedValues = this.getNowSelectedValues()
        dateData = this.getNowDateData()
      }

      this.$refs.vSlideSelect.show({
        // titles: ['开始时间', '结束时间'],
        lists: dateData,
        // selectedIndexs: [0, 0, 0], // 指定选择，通过重新赋值控制子组件选择
        selectedValues: selectedValues, // 指定选择
        selectedValuesObj,
        onChange (index, id, selectedIndexs) {
          // 联动
          if (id < 2) {
            let {years, months} = dateHandle
            let year = years[selectedIndexs[0]].value
            let month = months[selectedIndexs[1]].value
            this.setList(2, dateHandle.getDayData(year, month))
          }
          let selectedValues = this.getSelectedValues()
          let {0: d1 = {}, 1: d2 = {}, 2: d3 = {}, 3: d4 = {}, 4: d5 = {}} = selectedValues
          let selectedDate = new Date(d1.value, d2.value - 1, d3.value, d4.value, d5.value)
          if (selectedDate < nowBaseDate) {
            this.msgError('不能低于今天')
          } else {
            this.msgError('')
          }
        },
        onConfirm
      })
    },
    getNowDate () {
      let nowDate = this.nowDate
      if (nowDate) return nowDate

      let date = new Date()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()

      nowDate = this.nowDate = {
        year: date.getFullYear(),
        date,
        month,
        day,
        hour,
        minute
      }
      return nowDate
    },
    getHourMinute (h = 0, m = 0) {
      let hourMinute = this.hourMinute
      if (hourMinute) return hourMinute

      let selected = []

      let hour = []
      for (let i = 0; i < 24; i++) {
        hour.push({
          value: i,
          text: i + '时'
        })
        if (i >= h && (selected[0] === undefined)) {
          selected[0] = i
        }
      }
      let minute = []
      for (let i = 0; i < 12; i++) {
        let mm = i * 5
        minute.push({
          value: mm,
          text: mm + '分'
        })
        if (mm >= m && (selected[1] === undefined)) {
          selected[1] = mm
        }
      }
      hourMinute = this.hourMinute = {
        d: [hour, minute],
        selected
      }
      return hourMinute
    },
    getNowDateData () {
      // 生成年月列表数据
      return this.getData(this.getNowDate().date)
    },
    getNowSelectedValues () {
      let nowDate = this.getNowDate()
      let nowYear = nowDate.year
      let nowMonth = nowDate.month
      let nowDay = nowDate.day
      let nowHour = nowDate.hour
      let nowMinute = nowDate.minute
      let hourMinuteData = this.getHourMinute(nowHour, nowMinute)
      return [nowYear, nowMonth, nowDay].concat(hourMinuteData.selected)
    },
    getData (date) {
      return this.dateHandle.getData(date).concat(this.getHourMinute().d)
    }
  },
  components: {
    SlideSelect
  }
}
</script>

