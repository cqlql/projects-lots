<template>
  <div :class="$style.sliderOneLoad">
    <div :class="$style.move">
      <div v-for="(item, i) of itemsData" :class="$style.item" :style="{[transform]:`translate3d(${item.x*100}%, 0, 0)`}" :key="i">
        <div v-show="item.blank===false">{{item.page}}</div>
        <div v-show="item.blank">空白</div>
        <!-- <slot :itemData="item"/> -->
        <slot :name="i"/>
      </div>
    </div>
    <p>移动{{x}}</p>
    <div v-html="info"></div>
  </div>
</template>

<script>
import autoprefix from '@/modules/corejs/dom-css/autoprefix/index.js'
import swipex from '@/modules/corejs/dom-drag/swipex'
import LengthTest from './LengthTest'
import MoveHandle from './MoveHandle'
export default {
  mixins: [MoveHandle],
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
      itemsPosition: [0, 1, 2],
      transform: autoprefix('transform'),
      info: ''
    }
  },
  mounted () {
    this.slideInit()
  },
  methods: {
    slideInit () {
      const vm = this
      const { $el } = this
      const width = this.width = $el.clientWidth
      const lengthTest = new LengthTest(width)
      // const moveHandle = new MoveHandle($el.children[0], this.arrayPosition)
      const moveHandle = this
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
          moveHandle.move(xSegment)
          vm.info = ''
        },
        onSwipeLeft () {
          moveHandle.toLeft()
          vm.info += '<p>左滑，显示右边'
        },
        onSwipeRight () {
          moveHandle.toRight()
          vm.info += '<p>右滑，显示左边'
        },
        onSwipeNot () {
          switch (lengthTest.getResult(moveLength)) {
            case 1: // 右滑动，显示左边
              moveHandle.toRight()
              vm.info += '<p>右滑，显示左边'
              break
            case 2: // 左滑动，显示右边
              moveHandle.toLeft()
              vm.info += '<p>左滑，显示右边'
              break
            default:
              moveHandle.recovery()
          }
        }
      })
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
