<template>
  <div>
    <Demo/>
    <button @click="showDate">日期弹出</button>
    <SlideSelectDate ref="vSlideSelectDate"/>
  </div>
</template>

<script>
  import Demo from '@/modules/slide-select2/Demo.vue'
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
      Demo,
      SlideSelectDate
    }
  }
</script>

<style scoped>

</style>
