<template>
  <div>
    <button @click="showDate">日期弹出</button>
    <SlideSelectDate ref="vSlideSelectDate" />
  </div>
</template>

<script>
import SlideSelectDate from '@/components/slide-select-date/DateTime.vue'

export default {
  components: {
    SlideSelectDate
  },
  data () {
    return {
    }
  },
  methods: {
    showDate () {
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      this.$refs.vSlideSelectDate.show({
        // selectedValuesObj: this.selectedDate,
        // 设置年范围。未来3年
        yearRange: [year, year + 3],
        onConfirm: (vm) => {
          console.log(vm.getSelectedValues())
          // this.selectedDate = vm.getSelectedValues()
        },
        validity (selectedDate) {
          console.log(selectedDate, nowDate)
          if (selectedDate < nowDate) {
            return '不能低于今天'
          }
        }
      })
    }
  }
}
</script>
