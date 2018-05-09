<template>
  <div :class="$style.sliderOneLoad">
    <div :class="$style.move">
      <div v-for="(item, i) of itemsData" :class="$style.item" :style="{[transform]:`translate3d(${item.x*100}%, 0, 0)`}" :key="i">
        <div v-show="item.blank===false">{{item.page}}</div>
        <div v-show="item.blank">空白</div>
        <!-- <slot :itemData="item"/> -->
        <slot :name="i" />
      </div>
    </div>
    <p>移动{{x}}</p>
    <div v-html="info"></div>
  </div>
</template>

<script>
import transitionendOnce from '@/modules/corejs/animation/transitionend-once'
import autoprefix from '@/modules/corejs/dom-css/autoprefix/index.js'
import swipex from '@/modules/corejs/dom-drag/swipex'
import LengthTest from './LengthTest'
import MoveArray from './MoveArray'
// import MoveHandle from './MoveHandle'
export default {
  // mixins: [MoveHandle],
  // props: {
  //   startPage: {
  //     default: 0,
  //     type: Number
  //   },
  //   total: Number
  // },
  data () {
    return {
      itemsData: [{
        x: 0,
        blank: false,
        page: 0,
        data: {}
      }, {
        x: 1,
        blank: true,
        page: 1,
        data: {}
      }, {
        x: 2,
        blank: true,
        page: 2,
        data: {}
      }],

      // 显示位置。数组 0 显示为最左，1 中间，2最右，数组值为 itemsData 索引值
      // 移动操作将移动此数组
      // 动画完成后才更改此值
      itemsPosition: [0, 1, 2],

      transform: autoprefix('transform'),
      info: '',

      x: 0,
      index: 0, // 当前显示项索引
      page: 0, // 当前页索引
      total: 4
      // maxIndex: 2 // 最大项索引
    }
  },
  mounted () {
    this.moveArray = new MoveArray(this.itemsPosition)
    this.eMove = this.$el.children[0]
    this.slideInit()
  },
  methods: {
    slideInit () {
      const vm = this
      const { $el } = this
      const width = this.width = $el.clientWidth
      const lengthTest = new LengthTest(width)
      let moveLength = 0
      swipex({
        elem: $el,
        onDown () {
          if (vm.isRun) return false
        },
        onStart () {
          moveLength = 0
        },
        onMove (xSegment) {
          moveLength += xSegment
          vm.move(xSegment)
          vm.info = ''
        },
        onSwipeLeft () {
          vm.toLeft()
          vm.info += '<p>左滑，显示右边'
        },
        onSwipeRight () {
          vm.toRight()
          vm.info += '<p>右滑，显示左边'
        },
        onSwipeNot () {
          switch (lengthTest.getResult(moveLength)) {
            case 1: // 右滑动，显示左边
              vm.toRight()
              vm.info += '<p>右滑，显示左边'
              break
            case 2: // 左滑动，显示右边
              vm.toLeft()
              vm.info += '<p>左滑，显示右边'
              break
            default:
              vm.recovery()
          }
        }
      })
    },
    toLeft () {
      /* eslint-disable */
      let { page, total, index } = this
      let maxPage = total - 1
      page++
      index++
      if (page >= maxPage) {
        page = maxPage
        index = this.maxIndex
      }
      this.page = page
    },
    goPage (p, cb = () => { }) {
      let { page, total, index, maxIndex, maxPage } = this
      if (p > page) {
        let isStartFirst = page === 0 // 是否第一页起始
        let isLast = false // 是否为最后一页
        index++
        page = p

        // 最后一个，或者大于最后一个情况
        if (page >= maxPage) {
          page = maxPage
          index = this.maxIndex
          isLast = true
        }

        this.page = page
        this.index = index
        this.animate(-index * this.width, () => {
          if (isStartFirst === false && isLast === false) {
            this.moveArray.toLeft()
            index--
            this.setMoveElemX(-index * this.width)
            this.index = index
          }
          cb()
        })
      } else {

      }
      this.page = p
    },
    goPageNoAnimate () {
      let { page, total, index, maxIndex, maxPage } = this
      if (p > page) {
        let isStartFirst = page === 0 // 是否第一页起始
        let isLast = false // 是否为最后一页
        index++
        page = p

        // 最后一个，或者大于最后一个情况
        if (page >= maxPage) {
          page = maxPage
          index = this.maxIndex
          isLast = true
        }

        this.page = page
        this.index = index

        if (isStartFirst === false && isLast === false) {
          this.moveArray.toLeft()
          index--
          this.setMoveElemX(-index * this.width)
          this.index = index
        }
        // this.animate(-index * this.width, () => {
        //   if (isStartFirst === false && isLast === false) {
        //     this.moveArray.toLeft()
        //     index--
        //     this.setMoveElemX(-index * this.width)
        //     this.index = index
        //   }
        //   cb()
        // })
      } else {

      }
      this.page = p
    },
    animate (x, cb = () => { }) {
      if (this.x === x) {
        cb()
        return
      }
      this.isRun = true
      const { eMove } = this
      const { classList } = eMove
      const animateActiveClassName = this.$style.animateActive
      classList.add(animateActiveClassName)
      transitionendOnce(eMove, () => {
        this.isRun = false
        classList.remove(animateActiveClassName)
        cb()
      })
      this.setMoveElemX(x)
    },
    setMoveElemX (x) {
      this.x = x
      this.eMove.style[this.transform] = `translate3d(${x}px, 0, 0)`
    }
  },
  computed: {
    // 最大项索引
    maxIndex () {
      const { total } = this
      return total < 3 ? total - 1 : 2
    },
    maxPage () {
      return this.total - 1
    }
  },
  watch: {
    // 纠正位置 x
    itemsPosition (arr) {
      const { itemsData } = this
      arr.forEach((itemIndex, i) => {
        itemsData[itemIndex].x = i
      })
    }
  }
}
</script>

<style module>
.sliderOneLoad {
  overflow: hidden;
  position: relative;
  height: 300px;
  background-color: #ddd;
}
.move {
  width: 100%;
  height: 100%;
  position: relative;
  /* transform: translate3d(-100%, 0, 0); */
}
.item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* transform: translate3d(100%, 0, 0);

  &:first-child {
    transform: translate3d(0, 0, 0);
  }
  &:last-child {
    transform: translate3d(200%, 0, 0);
  } */
}
.animateActive {
  transition: transform 0.3s ease;
}
</style>
