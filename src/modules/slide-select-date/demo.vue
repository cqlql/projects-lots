<template>
  <div>
    <button @click="showDate">日期弹出</button>
    <SlideSelectDate ref="vSlideSelectDate"/>
  </div>
</template>

<script>
  import SlideSelectDate from '@/modules/slide-select-date/SlideSelectDate.vue'

  export default {
    data () {
      return {
      }
    },
    methods: {
      showDate () {
        this.$refs.vSlideSelectDate.show({
          // selectedValuesObj: this.selectedDate,
          onConfirm: (vm) => {
            console.log(vm.getSelectedValues())
            // this.selectedDate = vm.getSelectedValues()
          }
        })
      }
    },
    components: {
      SlideSelectDate
    }
  }
</script>
