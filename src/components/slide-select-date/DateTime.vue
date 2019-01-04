<template>
  <SlideSelect ref="vSlideSelect" />
</template>

<script>
import SlideSelect from '@/components/slide-select/SlideSelect'
import DateHandle from '@/components/slide-select-date/date-handle'
export default {
  components: {
    SlideSelect
  },
  created () {
    this.dateHandle = new DateHandle()
  },
  methods: {
    show ({ yearRange, selectedValues, selectedValuesObj, onConfirm, onChange, validity }) {
      let { dateHandle } = this
      // 设置年范围
      dateHandle.setYearRange(yearRange[0], yearRange[1])
      // 年月列表数据
      let dateData
      //
      let selectedIndexs
      if (selectedValuesObj) {
        let d = selectedValuesObj
        dateData = this.getData(d[0].value, d[1].value + 1)
      } else if (selectedValues) {
        dateData = this.getData(selectedValues[0], selectedValues[1])
      } else {
        selectedIndexs = [0, 0, 0]
        dateData = this.getData()
      }

      this.$refs.vSlideSelect.show({
        lists: dateData,

        // 指定选择，3选1
        selectedIndexs, // 指定选择，最优先
        selectedValuesObj, // 指定选择
        selectedValues, // 指定选择

        onChange (index, id, selectedIndexs) {
          // 联动
          if (id < 2) {
            let { years, months } = dateHandle
            let year = years[selectedIndexs[0]].value
            let month = months[selectedIndexs[1]].value
            this.setList(2, dateHandle.getDayData(year, month))
          }
          let selectedValues = this.getSelectedValues()

          // 切换月份，天变少情况可能会为undefined，所以才有这行保护
          let { 0: d1 = {}, 1: d2 = {}, 2: d3 = {}, 3: d4 = {}, 4: d5 = {} } = selectedValues

          let selectedDate = new Date(
            d1.value,
            d2.value - 1,
            d3.value,
            d4.value,
            d5.value
          )
          this.msgError(validity(selectedDate))
        },
        onConfirm
      })
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
    getData (year, month) {
      return this.dateHandle.getData(year, month).concat(this.getHourMinute().d)
    }
  }
}
</script>
