<template>
  <PulldownRefresh
    ref="vPulldownRefresh"
    :color="colorTop" :no-data="noData" :min-height="minHeight"
    :reload="onReload"
  >
    <slot />
    <BottomLoad
      ref="vBottomLoad"
      :start-page="startPage" :init-start="initStart" :color="colorBottom"
      :load="onBottomLoad"
    />
  </PulldownRefresh>
</template>
<script>
import BottomLoad from '@/components/bottom-load/BottomLoad.vue'
import PulldownRefresh from '@/components/pulldown-refresh/PulldownRefresh.vue'
export default {
  components: {
    PulldownRefresh,
    BottomLoad
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
    // 渲染组件后是否自动加载：只针对 BottomLoad
    initStart: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: Number,
      default: 0
    },
    startPage: {
      type: Number,
      default: 1
    },
    load: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      noData: false
    }
  },
  computed: {
    vPulldownRefresh () {
      return this.$refs.vPulldownRefresh
    },
    vBottomLoad () {
      return this.$refs.vBottomLoad
    }
  },
  methods: {
    async onReload (complete) {
      let { vBottomLoad, startPage } = this
      vBottomLoad.page = startPage

      let status = await this.load(startPage)

      if (status === 'noData') {
        this.vBottomLoad.hide()
        return status
      }
      if (status === 'finish') {
        return status
      }
      // 还有下一页情况。重置并检测是否需要加载
      vBottomLoad.retryStart()
    },
    async onBottomLoad (page) {
      let status = await this.load(page)

      // noData 情况交给 PulldownRefresh 处理
      if (status === 'noData') {
        this.vBottomLoad.hide()
        this.vPulldownRefresh.noData = true
        return 'finish'
      }
      return status
    },
    // 手动顶部刷新
    // 刷新当前页
    refresh () {
      this.vPulldownRefresh.refresh()
    },
    // 手动底部全新加载
    // 清除所有数据后进行全新加载用，比如切换页面
    restart () {
      this.vBottomLoad.restart()
    },
    bottomRetryStart () {
      this.vBottomLoad.retryStart() // 重置并检测是否需要加载
    }
  }
}
</script>
