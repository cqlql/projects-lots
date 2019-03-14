<template>
  <ScrollBottomLoad
    ref="vScrollBottomLoad"
    :color="color"
    :first-load="firstLoad"
    :no-data="noData"
    @loadData="load"
  />
</template>

<script>
import ScrollBottomLoad from './ScrollBottomLoad.vue'
export default {
  components: {
    ScrollBottomLoad
  },
  props: {
    // 图标字体颜色。两种色系选择
    // black、white
    color: {
      type: String,
      default: 'black'
    },
    // 渲染组件后是否自动加载
    firstLoad: {
      type: Boolean,
      default: true
    },
    noData: {
      type: Boolean,
      default: false
    },
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
  computed: {
    vScrollBottomLoad () {
      return this.$refs.vScrollBottomLoad
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
      this.vScrollBottomLoad.reStart()
    },
    reset () {
      this.vScrollBottomLoad.reset()
    },
    tryLoad () {
      this.vScrollBottomLoad.tryLoad()
    },
    hide () {
      this.vScrollBottomLoad.hide()
    },
    reTryLoad () {
      this.vScrollBottomLoad.reTryLoad()
    }
  }
}
</script>
