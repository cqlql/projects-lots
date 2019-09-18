<template>
  <PulldownRefresh
    ref="vPulldownRefresh"
    :color="colorTop" :no-data="noData" :min-height="minHeight"
    :reload="onReload"
    :get-elem="getElem"
  >
    <div ref="eCont"><slot /></div>
    <BottomLoad
      ref="vBottomLoad"
      :start-page="startPage" :color="colorBottom"
      :init-start="false"
      :load="onBottomLoad"
      :get-elem="getElemBottomLoad"
      :get-cont-elem="()=>$refs.eCont"
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
    // 最小容器高度。否则没内容时将没有拖动区域
    minHeight: {
      type: Number,
      default: undefined
    },
    startPage: {
      type: Number,
      default: 1
    },
    load: {
      type: Function,
      default: undefined
    },
    getElem: {
      type: Function,
      default: () => window
    }
  },
  data () {
    return {
      noData: false,
      getElemBottomLoad: () => this.getElemMin()
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
  mounted () {
    let containerElem = this.getElem()
    if (containerElem === 'self') {
      containerElem = this.$el
      this.getElemMin = () => containerElem
    }
    if (this.initStart) {
      this.vBottomLoad.restart()
      // setTimeout(() => {
      //   this.vPulldownRefresh.refresh()
      // }, 10)
    }
  },
  methods: {
    async onReload () {
      let { vBottomLoad, startPage } = this
      let status = await this.load(startPage)
      if (status === 'noData') {
        vBottomLoad.hide()
        vBottomLoad.finish()
        return status
      }
      if (status === 'finish') {
        vBottomLoad.show()
        vBottomLoad.finish()
        return status
      }
      // 还有下一页情况。重置检测是否需要加载
      vBottomLoad.retryStart(startPage) // 已经由下拉刷新加载了第一页，所以这里加一页
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
    },
    // 容器滚动到顶部。目前已在 drag.js 中控制
    // scrollTop () {
    //   let containerElem = this.getElemMin()
    //   if (containerElem === window) window.scrollTo(0, 0)
    //   else containerElem.scrollTop = 0
    // },
    // 以函数为属性传给子组件一旦赋值则无法改变。。所以通过一个中间函数处理
    getElemMin () {
      return this.getElem()
    }
  }
}
</script>
