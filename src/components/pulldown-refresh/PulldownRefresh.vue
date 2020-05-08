<template>
  <div :class="[$style.pulldownRefresh, $style[color]]">
    <div :class="[$style.topBack,$style[statesName]]">
      <LoadIco :color="color" :class="$style.preloader" />
      <span :class="$style.arrow" />
      <span :class="$style.text">{{ statesText }}</span>
    </div>
    <div ref="cont" :class="$style.cont" :style="{minHeight:minHeight+'px'}">
      <div v-if="noData" :class="$style.noData" />
      <slot />
    </div>
  </div>
</template>

<script>
import LoadIco from '@/components/ico/load'
import Darg from './drag'
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
    minHeight: {
      type: Number,
      default: undefined
    },
    reload: {
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
      states: 0 // 0 未开始 1 已开始，不满足 2 满足 3 加载中 4 加载完成
    }
  },
  computed: {
    statesName () {
      return ['static', 'start', 'ready', 'loading', 'complete'][this.states]
    },
    statesText () {
      return ['', '下拉刷新', '松开刷新', '加载中', '刷新完成'][this.states]
    }
  },
  mounted () {
    let containerElem = this.getElem()
    if (containerElem === 'self') {
      containerElem = this.$el
      // if (this.minHeight !== undefined) {
      //   containerElem.style.height = this.minHeight + 'px'
      // }
      containerElem.classList.add(this.$style.self)
    }

    this.drag = Darg({
      elem: this.$refs.cont, // 拖动元素，也是事件元素
      containerElem, // 容器元素
      maxY: 60,
      loadingY: 30,
      transitionActive: this.$style.transitionActive,
      onChange: states => {
        this.states = states
      },
      onReload: async () => {
        // let loadStates = await this.reload()
        this.noData = (await this.reload()) === 'noData'
      }
    })
  },
  methods: {
    refresh () {
      this.drag.refresh()
    }
  }
}
</script>

<style module>
.pulldownRefresh {
  position: relative;
}
/* 以自身为容器 */
.self {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.topBack {
  text-align: center;
  position: absolute;
  width: 100%;
  padding-top: 4px;
}
.preloader {
  vertical-align: middle;
  display: none;
}
.arrow {
  vertical-align: middle;
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M469.09%20983.91L190.24%20715.78c-21.45-21.45-21.45-53.62%201e-8-75.07s53.62-21.45%2075.07%200L458.37%20823.03l0-750.77c0-32.17%2021.45-53.62%2053.62-53.62s53.62%2021.45%2053.62%2053.62l0%20750.77L758.68%20629.97c21.45-10.72%2053.62-10.72%2075.07%2010.72%2021.45%2021.45%2021.45%2053.62%201e-8%2075.07l-268.13%20268.13c-10.72%2010.72-53.62%2053.62-96.52%200z%22%20fill%3D%22%236c6c6c%22%3E%3C/path%3E%3C/svg%3E");
  background-size: 100%;
  transition: 0.3s ease;
  display: none;
}
.text {
  vertical-align: middle;
  color: #6c6c6c;
}

/* 白色风格 */
.white .arrow {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M469.09%20983.91L190.24%20715.78c-21.45-21.45-21.45-53.62%201e-8-75.07s53.62-21.45%2075.07%200L458.37%20823.03l0-750.77c0-32.17%2021.45-53.62%2053.62-53.62s53.62%2021.45%2053.62%2053.62l0%20750.77L758.68%20629.97c21.45-10.72%2053.62-10.72%2075.07%2010.72%2021.45%2021.45%2021.45%2053.62%201e-8%2075.07l-268.13%20268.13c-10.72%2010.72-53.62%2053.62-96.52%200z%22%20fill%3D%22%23fff%22%3E%3C/path%3E%3C/svg%3E");
}
.white .text {
  color: #fff;
}

/* 各状态 */
.start .arrow {
  display: inline-block;
}
.ready .arrow {
  display: inline-block;
  transform: rotate(-180deg);
}
.loading .arrow {
  display: none;
}
.loading .preloader {
  display: inline-block;
}
.complete .arrow {
  display: none;
}

.cont {
  position: relative;
  min-height: 100%;
}
.transitionActive {
  transition: 0.3s ease;
}
.noData {
  background: url(@/components/ico/no-data.png) no-repeat center;
  background-size: 50% auto;
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
