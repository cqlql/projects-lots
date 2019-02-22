<template>
  <PulldownRefresh ref="vPulldownRefresh" :color="colorTop" :no-data="noData" :min-height="minHeight" @reload="reload">
    <slot />
    <ScrollBottomLoad ref="vScrollBottomLoad" :first-load="firstLoad" :color="colorBottom" @loadData="loadData" />
  </PulldownRefresh>
</template>
<script>
import ScrollBottomLoad from '../scroll-bottom-load'
import PulldownRefresh from '../pulldown-refresh'
export default {
  components: {
    PulldownRefresh,
    ScrollBottomLoad
  },
  props: {
    // 图标字体颜色。两种色系选择
    // black、white
    colorTop: {
      type: String,
      default: 'black'
    },
    colorBottom: {
      type: String,
      default: 'black'
    },
    // 渲染组件后是否自动加载：只针对 ScrollBottomLoad
    firstLoad: {
      type: Boolean,
      default: true
    },
    noData: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: Number,
      default: 0
    }
  },
  computed: {
    vPulldownRefresh () {
      return this.$refs.vPulldownRefresh
    },
    vScrollBottomLoad () {
      return this.$refs.vScrollBottomLoad
    }
  },
  watch: {
    noData () {
      this.noDataHideScrollBottomLoad()
    }
  },
  mounted () {
    this.noDataHideScrollBottomLoad()
  },
  methods: {
    noDataHideScrollBottomLoad () {
      if (this.noData) {
        this.$refs.vScrollBottomLoad.hide()
      }
    },
    reload (complete) {
      let { vScrollBottomLoad } = this
      let option = {
        // type: 'refresh',
        isRefresh: true,
        complete (isFinish) {
          complete()
          if (!isFinish) {
            vScrollBottomLoad.reset() // 重置激活
            vScrollBottomLoad.tryLoad() // 检测是否执行加载
          }
        },
        vScrollBottomLoad
      }
      this.$emit('load', option)
      this.$emit('refreshLoad', option)
    },
    loadData (loaded) {
      let { vScrollBottomLoad } = this
      let option = { complete: loaded, vScrollBottomLoad }
      this.$emit('load', option)
      this.$emit('bottomLoad', option)
    },
    // 手动顶部刷新
    // 刷新当前页
    refresh () {
      this.vPulldownRefresh.refresh()
    },
    // 手动底部全新加载
    // 清除所有数据后进行全新加载用，比如切换页面
    reStart () {
      this.vScrollBottomLoad.reStart()
    }
  }
}
</script>
