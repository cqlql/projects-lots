<template>
  <ScrollBottomLoad ref="vScrollBottomLoad" @loadData="load" />
</template>

<script>
import ScrollBottomLoad from './ScrollBottomLoad.vue'
export default {
  components: {
    ScrollBottomLoad
  },
  props: {
    startPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      page: this.startPage - 1
    }
  },
  methods: {
    load (complete) {
      let that = this
      let page = this.page + 1
      this.$emit('load', {
        complete (isFinish) {
          that.page = page
          complete(isFinish)
        },
        page
      })
    },
    reload () {
      this.page = 0
      this.$refs.vScrollBottomLoad.reStart()
    }
  }
}
</script>
