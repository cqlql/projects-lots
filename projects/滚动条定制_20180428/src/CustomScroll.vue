<template>
  <!-- <transition name="custom-scroll-zoom-out" enter-active-class="custom-scroll-transition-active" leave-active-class="custom-scroll-transition-active"> -->
  <div v-show="has&&show" class="custom-scroll" :style="{width:scrollBoxW+arrowW*2+'px',left:boxX+'px',top:boxY+'px'}">
    <a ref="eArrowLeft" href="javascript:void(0)" class="custom-scroll-arrows custom-scroll-arrows-left" :style="{width:arrowW+'px'}" />
    <a ref="eArrowRight" href="javascript:void(0)" class="custom-scroll-arrows custom-scroll-arrows-right" :style="{width:arrowW+'px'}" />
    <div class="custom-scroll-box" :style="{width:scrollBoxW+'px'}">
      <ul ref="eCellBox" class="custom-scroll-cell-box">
        <li v-for="(i,index) in (totalNum*1)" :key="i" :data-index="index" :style="{width:cellW+'px'}" />
      </ul>
      <div ref="eScrollBar" class="custom-scroll-bar" :style="{width:scrollBarW+'px',left:left+'px'}">
        <!-- <div class="hint">
            {{selectedWeek.join(unit+' ')}}{{unit}}
          </div> -->
        <div class="hint">{{ unit }}</div>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import dragPlus from '@/modules/corejs/dom-drag/drag-plus'
import Animation from '@/modules/corejs/animation/animation'
import relativexy from '@/modules/corejs/dom/relativexy'
export default {
  data () {
    return {
      unit: '',
      totalNum: 0,
      tds: [],
      arrowW: 30,
      barH: 20,
      cellW: 0,
      scrollBoxW: 0,
      scrollBarW: 0,
      left: 0,
      boxX: 0,
      boxY: 0,
      selectedWeek: [],
      first: 0,
      second: 0,
      third: 0,
      showNum: 4,
      show: true,
      positionElemObj: undefined,
      positionElem: undefined
    }
  },
  computed: {
    has () {
      return this.tds.length > 0 && this.showNum < this.totalNum
    }
  },
  watch: {
    totalNum (v, old) {
      if (this.has) {
        this.updateSize()
        this.changeAndReset(0, v, old)
      }
    },
    showNum () {
      if (this.has) {
        this.updateSize()
        this.changeByShowNum()
      }
    },
    positionElem (el) {
      if (typeof el === 'string') {
        this.positionElemObj = document.querySelector(el)
      } else {
        this.positionElemObj = el
      }
      this.update()
    }
  },
  mounted () {
    const vm = this
    this.dragInit()
    const timer = this.timer = {
      start (fn) {
        this.stop()
        this.stopId = setInterval(() => {
          vm.updateSize()
        }, 600)
      },
      stop () {
        clearInterval(this.stopId)
      }
    }
    this.destroyOther = function () {
      timer.stop()
    }
  },
  destroyed () {
    this.destroyOther()
  },
  methods: {
    onChange () { },
    selectIndex () {},
    setTds () {
      const tds = []
      const { positionElemObj } = this
      if (positionElemObj) {
        const allTds = positionElemObj.children
        for (let i = 2, len = allTds.length - 1; i < len; i++) {
          tds.push(allTds[i])
        }
      }
      this.tds = tds
    },
    updateSize () {
      let w = 0
      let { tds, arrowW, barH, showNum, boxElem } = this
      tds.forEach(td => {
        w += td.offsetWidth
      })
      const boxXY = relativexy(tds[0], boxElem)
      const scrollBoxW = this.scrollBoxW = w
      const cellW = this.cellW = scrollBoxW / this.totalNum // 格子宽度，即每周宽度
      let scrollBarW = cellW * showNum
      if (scrollBarW > scrollBoxW) {
        scrollBarW = scrollBoxW
      }
      this.scrollBarW = scrollBarW

      this.maxX = scrollBoxW - scrollBarW
      this.lastIndex = Math.round((scrollBoxW - scrollBarW) / cellW)
      this.boxX = boxXY.x - arrowW
      this.boxY = boxXY.y - barH
    },
    dragInit () {
      const animation = new Animation()
      let currIndex = 0
      let isChangeId = false
      const vm = this

      // 动画复位
      function animationReset () {
        let { left, cellW } = vm
        animation.start(function (p) {
          vm.left = left + (currIndex * cellW - left) * p
        }, 200)
      }

      function isChange (index, cb) {
        if (currIndex !== index) {
          change(index, cb)
          return true
        }
      }

      function change (index, cb = () => { }) {
        currIndex = index
        cb()
        let selectedWeek = []
        let { showNum, totalNum } = vm
        for (let i = 0, len = (showNum < totalNum ? showNum : totalNum); i < len; i++) {
          selectedWeek.push(i + 1 + index)
        }
        vm.selectedWeek = selectedWeek
      }
      // change(currIndex) // 初始
      dragPlus({
        elem: this.$refs.eScrollBar,
        onDown (e) {
          animation.stop()
          isChangeId = currIndex
          e.preventDefault()
        },
        onMove ({ lx: x, ly: y }) {
          let { maxX, cellW, left } = vm
          left += x

          if (left < 0) {
            left = 0
          }
          if (left > maxX) {
            left = maxX
          }

          let r = left / cellW
          let index = ~~r
          if (r % 1 > 0.5) {
            index += 1
          }
          isChange(index)
          vm.left = left
        },
        onEnd () {
          animationReset()
          if (isChangeId !== currIndex) {
            vm.onChange(getSelectedWeekValue())
          }
        }
      })

      function getSelectedWeekValue () {
        return vm.selectedWeek
      }

      this.$refs.eArrowLeft.addEventListener('click', () => {
        let index = currIndex
        index -= 1
        if (index < 0) {
          index = 0
        }
        if (isChange(index, animationReset)) vm.onChange(getSelectedWeekValue())
      })
      this.$refs.eArrowRight.addEventListener('click', () => {
        let index = currIndex
        index += 1
        if (index > this.lastIndex) {
          index = this.lastIndex
        }
        if (isChange(index, animationReset)) vm.onChange(getSelectedWeekValue())
      })

      this.$refs.eCellBox.addEventListener('click', ({ target }) => {
        if (target.tagName === 'LI') {
          let index = target.dataset.index * 1
          if (index > currIndex) {
            index -= this.showNum - 1
          }
          if (isChange(index, animationReset)) vm.onChange(getSelectedWeekValue())
        }
      })

      // 总数改变重置
      this.changeAndReset = function (index, totalNum, oldTotalNum) {
        isChangeId = currIndex
        change(index, animationReset)
        if (isChangeId !== currIndex || totalNum < vm.showNum || oldTotalNum < vm.showNum) {
          vm.onChange(getSelectedWeekValue())
        }
      }
      // 显示总数改变
      this.changeByShowNum = function () {
        change(currIndex)
        vm.onChange(getSelectedWeekValue())
      }
      // 手动选中
      this.selectIndex = function (index) {
        if (index > this.lastIndex) {
          index = this.lastIndex
        }
        change(index, animationReset)
      }
    },
    destroy () {
      this.$destroy()
      this.$el.remove()
    },
    update () {
      if (this.positionElemObj) {
        this.setTds()
      }
      if (this.has) {
        this.updateSize()
        this.timer.start()
        // this.selectIndex(0) // 初始从0开始
      } else {
        this.timer.stop()
      }
    }
  }
}
</script>

<style scoped>
.custom-scroll {
  position: absolute;
  transition: left,top 0.2s ease;
}
.custom-scroll-box {
  width: 500px;
  height: 20px;
  /* border: 3px solid #ddd; */
  position: relative;
  float: left;
}

.custom-scroll-bar {
  height: 20px;
  width: 50px;
  background: #3eb2f9;
  position: absolute;
  top: 0;
  left: 0;
}
.custom-scroll-cell-box {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.custom-scroll-cell-box li {
  height: 20px;
  width: 50px;
  float: left;
  /* box-shadow: inset 0 0 0px 1px #000; */
}
.custom-scroll-cell-box li:nth-child(2n) {
  background-color: #ddd;
}
.custom-scroll-cell-box li:nth-child(2n + 1) {
  background-color: #eee;
}
.custom-scroll-arrows {
  width: 50px;
  height: 20px;
  /* background-color: #000; */
  /* outline: 1px solid #e5e5e5; */
}
.custom-scroll-arrows-left {
  float: left;
}
.custom-scroll-arrows-left::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 20px 10px 0;
    border-color: transparent #3eb2f9 transparent transparent;
    margin: 0 5px;
}

.custom-scroll-arrows-right {
  float: right;
}
.custom-scroll-arrows-right::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 20px;
    border-color: transparent transparent transparent #3eb2f9;
    margin: 0 5px;
}
.hint {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  white-space: nowrap;
}

/* .custom-scroll-transition-active {
  transition: 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  transition-property: opacity, transform;
}
.custom-scroll-zoom-out-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.custom-scroll-zoom-out-enter {
  opacity: 0;
  transform: scale(1.2);
} */
</style>
