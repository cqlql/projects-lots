<template>
  <div :class="[$style.bottomLoad, color==='white'? $style.white:'', isShow?'':$style.hide]">
    <span v-if="isFinish" :class="$style.txt">- 已经到底了 -</span>
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
    startPage: {
      type: Number,
      default: 1
    }
    // noData: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      isFinish: false,
      isLoad: false,
      isShow: true,
      noData: false,
      // containerElem: null,
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
    restart () {
      this.reset()
      this.load()
    },
    // 重置并到底检测是否需要加载
    retryStart () {
      this.reset()
      this.tryLoad()
    },
    bindScroll () {
      this.containerElem.addEventListener('scroll', this.tryLoad)
    },
    unbindScroll () {
      this.containerElem.removeEventListener('scroll', this.tryLoad)
    },

    load () {
      this.isLoad = true
      let page = this.page + 1
      this.$emit('load', {
        page,
        complete: status => {
          this.page = page
          if (!status || status === 'continue') {
            // 解决页面切换动画问题：数据渲染后，如果 body 高度没有变化，300ms 后才进行加载(300ms动画结束)
            let { body } = document
            let preHeight = body.clientHeight
            this.$nextTick(() => {
              if (preHeight === body.clientHeight) {
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
        }
      })
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
        this.load()
      }
    },
    // 是否到底。在 initContainerElem 中 初始。根据容器元素是否是 window 而有所不同
    testBottom () {},
    // 初始容器元素。顺便初始 testBottom
    initContainerElem () {
      let { getElem } = this
      // if (getElem) {
      let el = this.containerElem = getElem()
      if (el === window) {
        this.testBottom = () => {
          if (document.body.clientHeight - el.innerHeight - el.pageYOffset < this.minHeight) {
            return true
          }
        }
      } else {
        this.testBottom = () => {
          if (el.scrollHeight - el.clientHeight - el.scrollTop < this.minHeight) {
            return true
          }
        }
      }
      // } else {
      //   this.containerElem = this.$el.parentElement
      // }
    },
    // 重置但不加载
    reset () {
      this.isFinish = false
      this.isLoad = false
      this.isShow = true
      this.page = this.startPage - 1
      this.initContainerElem()
      this.unbindScroll()
      this.bindScroll()
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
