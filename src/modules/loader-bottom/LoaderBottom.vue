<template>
  <div class="loader-bottom" :class="[color==='white'?'l-white':'', isShow?'':'hide']">
    <span v-if="isFinish" class="txt">我也有底线~</span>
    <div v-else class="hide" :class="{show:isLoad}">
      <span class="preloader" :class="[color==='white'?'preloader-white':'']"></span>
      <span class="txt">正在加载...</span>
    </div>
  </div>
</template>

<script>
import '../css-base/preloader.css'
import LoaderBottom from './loader-bottom'
export default {
  name: 'loader-bottom',
  props: {
    // 图标字体颜色。两种色系选择
    // black、white
    color: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      isFinish: false,
      isLoad: false,
      isShow: true
    }
  },
  mounted () {
    this.loaderBottom = new LoaderBottom()
    this.scroll = () => {
      this.testLoad()
    }
    this.reStart()
  },
  methods: {
    load () {
      this.isLoad = true
      this.$emit('loadData', isFinish => {
        if (isFinish) {
          this.finish()
        } else {
          this.$nextTick(() => {
            // 刷新body高度
            this.loaderBottom.update()
            this.loaded()
          })
        }
      })
    },
    // 检测加载
    // 内部接口，不推荐外部调用
    testLoad () {
      if (this.isLoad === false && this.loaderBottom.test()) {
        this.load()
      }
    },
    // 尝试加载，条件不满足不加载。
    // 外部调用使用此接口
    tryLoad () {
      if (this.isFinish) return
      this.$nextTick(() => {
        // 刷新body高度
        this.loaderBottom.update()
        this.loaded()
      })
    },
    // 加载完成(非结束)后调用
    loaded () {
      this.isLoad = false
      this.testLoad()
    },
    // 加载完成，而且已经结束后调用
    finish () {
      this.offScroll()
      this.isLoad = false
      this.isFinish = true
    },
    offScroll () {
      window.removeEventListener('scroll', this.scroll)
    },
    // 重置并直接开始加载
    reStart () {
      this.reset()
      this.load() // 直接加载
    },
    // 重置但不加载
    reset () {
      this.isFinish = false
      this.isLoad = false
      this.isShow = true
      this.offScroll()
      window.addEventListener('scroll', this.scroll)
      // 刷新body高度
      this.loaderBottom.update()
    },
    // 隐藏控件
    hide () {
      this.isShow = false
    },
    // 显示控件
    show () {
      this.isShow = true
    }
  },
  destroyed () {
    this.offScroll()
  }
}
</script>

<style scoped>
  .loader-bottom {
    height: 20px;
    padding: 8px 0;
    text-align: center;
    .preloader{
      vertical-align: middle;
    }

    .txt{
      color: #666;
      vertical-align: middle;
    }

    &.l-white .txt {
      color: #fff;
    }
  }
  .hide{
    opacity: 0;
  }
  .show{
    opacity: 1;
  }
</style>
