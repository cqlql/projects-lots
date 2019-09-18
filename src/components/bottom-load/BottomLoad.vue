<template>
  <div
    :class="[
      $style.bottomLoad,
      color==='white'? $style.white:'',
      isShow?'':$style.hide
    ]"
  >
    <span v-if="isFinish" :class="$style.txt">- 没有更多了 -</span>
    <div v-else class="hide" :class="{[$style.show]:isLoad}">
      <LoadIco :color="color" :class="$style.preloader" />
      <span :class="$style.txt">正在加载...</span>
    </div>
  </div>
</template>

<script>
import LoadIco from '@/components/ico/load'
export default {
  components: {
    LoadIco
  },
  props: {
    // 图标字体颜色。两种色系选择
    // black、white
    color: {
      type: String,
      default: 'black'
    },
    // 渲染组件后是否直接开始加载
    initStart: {
      type: Boolean,
      default: true
    },
    // 容器元素。默认为 window
    getElem: {
      type: Function,
      default: () => window
    },
    // 内容元素。计算真实内容高度，是否需要加载
    getContElem: {
      type: Function,
      default: () => document.body
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
      isFinish: false,
      isLoad: false,
      isShow: true,
      noData: false,
      page: 0,
      minHeight: 36 // 用来检测的最小高度
    }
  },
  mounted () {
    if (this.initStart) this.restart()
  },
  destroyed () {
    this.unbindScroll()
  },
  methods: {
    // 重置并直接开始加载(不进行检测)
    restart (page) {
      this.reset(page)
      this.toLoad()
    },
    // 重置并到底检测是否需要加载
    retryStart (page) {
      this.reset(page)
      this.tryLoad()
    },
    bindScroll () {
      this.containerElem.addEventListener('scroll', this.tryLoad)
    },
    unbindScroll () {
      this.containerElem.removeEventListener('scroll', this.tryLoad)
    },

    async toLoad () {
      this.isLoad = true
      let page = this.page + 1
      let status = await this.load(page)
      this.page = page
      if (!status || status === 'continue') {
        // 解决页面切换动画问题：数据渲染后，如果 body 高度没有变化或者等于0，300ms 后才进行加载(300ms动画结束)
        let preHeight = this.getContainerHeight()
        this.$nextTick(() => {
          // 等于0的情况可能页面离开
          let h = this.getContainerHeight()
          if (h === 0 || preHeight === h) {
            setTimeout(() => {
              this.loaded()
            }, 300)
          } else {
            this.loaded()
          }
        })
      } else {
        this.noData = status === 'noData'
        this.finish()
      }
    },
    // 加载完成(非结束)后调用
    loaded () {
      this.isLoad = false
      this.tryLoad()
    },
    // 加载完成，而且已经结束后调用
    finish () {
      this.unbindScroll()
      this.isLoad = false
      this.isFinish = true
    },
    // 检测加载
    tryLoad () {
      if (this.isLoad === false && this.testBottom()) {
        this.toLoad()
      }
    },
    // 容器高度
    getContainerHeight () {
      let el = this.containerElem
      if (el === window) {
        return document.body.clientHeight
      } else {
        return el.scrollHeight
      }
    },
    // 是否到底。在 initContainerElem 中 初始。根据容器元素是否是 window 而有所不同
    // testBottom () {},
    // 初始容器元素。顺便初始 testBottom
    initContainerElem () {
      let el = this.containerElem = this.getElem()
      let elCont = this.getContElem()
      if (el === window) {
        this.testBottom = () => {
          if (elCont.offsetHeight - el.innerHeight - el.pageYOffset < this.minHeight) {
            return true
          }
        }
      } else {
        this.testBottom = () => {
          if (elCont.offsetHeight - el.clientHeight - el.scrollTop < this.minHeight) {
            return true
          }
        }
      }
    },
    // 重置但不加载
    // page: 指定页开始加载，默认第一页
    reset (page = this.startPage - 1) {
      this.isFinish = false
      this.isLoad = false
      this.isShow = true
      this.page = page
      this.initContainerElem()
      this.unbindScroll()
      this.bindScroll()
    },
    // 隐藏控件
    hide () {
      this.isShow = false
    },
    // 显示控件
    show () {
      this.isShow = true
    }
  }
}
</script>

<style module>
.bottomLoad {
  height: 20px;
  padding: 8px 0;
  text-align: center;
  &.white .txt {
    color: #fff;
  }
}
.preloader {
  vertical-align: middle;
}

.txt {
  color: #666;
  vertical-align: middle;
}

.hide {
  opacity: 0;
}
.show {
  opacity: 1;
}
</style>
