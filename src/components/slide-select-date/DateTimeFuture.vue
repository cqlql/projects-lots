<template>
  <DateTime ref="vDateTime" />
</template>

<script>
import DateTime from '@/components/slide-select-date/DateTime'
import DateHandle from '@/components/slide-select-date/date-handle'
export default {
  components: {
    DateTime
  },
  created () {
    this.dateHandle = new DateHandle()
  },
  methods: {
    show ({ selectedValues, selectedValuesObj, onConfirm }) {
      let nowDate = this.getNowDate()
      let { year: nowYear, date: nowBaseDate } = nowDate

      // 年月列表数据
      let dateData

      // 默认用当前时间初始
      if (!selectedValuesObj && !selectedValues) {
        selectedValues = this.getNowSelectedValues(nowDate)
      }

      this.$refs.vDateTime.show({
        // titles: ['开始时间', '结束时间'],
        lists: dateData,

        // 年范围。未来3年
        yearRange: [nowYear, nowYear + 3],

        // 指定选择，3选1
        selectedValuesObj, // 指定选择，最优先
        // selectedIndexs: [0, 0, 0], // 指定选择，通过重新赋值控制子组件选择
        selectedValues, // 指定选择

        validity (selectedDate) {
          if (selectedDate < nowBaseDate) {
            return '不能低于今天'
          }
        },
        onConfirm
      })
    },
    getNowDate () {
      let nowDate
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
    getNowSelectedValues (nowDate) {
      let nowYear = nowDate.year
      let nowMonth = nowDate.month
      let nowDay = nowDate.day
      let nowHour = nowDate.hour
      let nowMinute = nowDate.minute
      let hourMinuteData = this.$refs.vDateTime.getHourMinute(nowHour, nowMinute)
      return [nowYear, nowMonth, nowDay].concat(hourMinuteData.selected)
    }
  }
}
</script>
