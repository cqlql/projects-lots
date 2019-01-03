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
      this.$refs.vSlideSelectDate.show({
        // selectedValuesObj: this.selectedDate,
        yearRange: [],
        onConfirm: (vm) => {
          console.log(vm.getSelectedValues())
          // this.selectedDate = vm.getSelectedValues()
        },
        validity () {
        }
      })
    }
  }
}
</script>
