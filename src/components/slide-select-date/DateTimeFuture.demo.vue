<template>
  <div>
    <p>选择未来3年</p>
    <button @click="showDate">日期选择弹出</button>
    {{ selected[0].text }}
    {{ selected[1].text }}
    {{ selected[2].text }}
    {{ selected[3].text }}
    {{ selected[4].text }}
    <SlideSelectDate ref="vSlideSelectDate" />
  </div>
</template>

<script>
import SlideSelectDate from '@/components/slide-select-date/DateTimeFuture.vue'

export default {
  components: {
    SlideSelectDate
  },
  data () {
    return {
      selectedValuesObj: null
    }
  },
  computed: {
    selected () {
      return this.selectedValuesObj || [{}, {}, {}, {}, {}]
    }
  },
  methods: {
    showDate () {
      this.$refs.vSlideSelectDate.show({
        selectedValuesObj: this.selectedValuesObj,
        onConfirm: (vm) => {
          this.selectedValuesObj = vm.getSelectedValues()
        }
      })
    }
  }
}
</script>
