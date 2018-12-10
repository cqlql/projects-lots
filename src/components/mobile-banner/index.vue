<script>
import swipex from '@/modules/corejs/dom-drag/swipex'
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
import transitionendOnce from '@/modules/corejs/animation/transitionend-once'
import Timer from '@/modules/corejs/time/timer'
let transform = autoprefix('transform')
export default {
  render () {
    let lis = []
    this.fakeImages.forEach((src, i) => {
      lis.push(
        <li key={i} style={{ [transform]: `translateX(${i * 100}%)` }}>
          <img src={src} />
        </li>
      )
    })
    return (
      <div ref="eBox" class="banner">
        <ul ref="eMove" class="move">{lis}</ul>
      </div>
    )
  },
  props: {
    images: Array,
    type: Number, // 1 左右切换 2 渐变
    // 初始显示第几张
    initShowIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      boxW: 0,
      timerInterval: 0,
      currFakeIndex: 0
    }
  },
  computed: {
    isFake () {
      return this.images.length > 1
    },
    // 头尾增加，不掉头实现
    fakeImages () {
      if (this.isFake) {
        let imgs = this.images.slice(0)
        imgs.unshift(imgs[imgs.length - 1])
        imgs.push(imgs[1])
        return imgs
      }
      return this.images
    },
    eMove () {
      return this.$refs.eMove
    },
    eBox () {
      return this.$refs.eBox
    },
    count () {
      return this.images.length
    },
    fakeCount () {
      return this.count + 2
    }
  },
  mounted () {
    this.updateBoxWidth()
    // this.fakeIndex = this.getFakeIndex(this.initShowIndex)
    this.moveByIndex(this.currFakeIndex = this.getFakeIndex(this.initShowIndex))
    this.swipeInit()
  },
  methods: {
    // 真实索引
    getRealIndex (fakeIndex) {
      let { count, fakeCount } = this
      if (fakeIndex > fakeCount - 2) {
      // 第一个情况

        return 0
      }
      if (fakeIndex === 0) {
      // 最后一个情况
        return count - 1
      }

      return fakeIndex - 1
    },
    getFakeIndex (index) {
      if (this.isFake) return index + 1
      return index
    },
    show (index) {
      this.moveByIndex(index)
    },
    moveByIndex (index) {
      this.move(-index * this.boxW)
    },
    move (x) {
      this.eMove.style[transform] = 'translate3d(' + x + 'px,0,0)'
    },
    updateBoxWidth () {
      this.boxW = this.eBox.clientWidth
    },
    swipeInit () {
      let boxW

      let timer
      if (this.timerInterval) {
        timer = this.timer = new Timer({
          time: this.timerInterval,
          callBack: () => {
            this.swipeLeft()
          }
        })
      } else {
        timer = this.timer = {
          start () {},
          stop () {}
        }
      }

      // 拖动的长度
      this.moveLength = 0

      // 拖动情况 松开时 是否进行滑动的最大偏移值
      let offset // = boxW / 3

      // this.isRun = false // 是否动画进行中

      // let isChange = false // 是否有更改

      swipex({
        elem: this.eBox,
        onSwipeLeft: () => { this.swipeLeft() },
        onSwipeRight: () => { this.swipeRight() },
        onSwipeNot: () => {
          let { moveLength } = this
          // 未发生，但有移动;

          // 超过一般情况 滑动
          if (Math.abs(moveLength) > offset) {
            if (moveLength > 0) {
              this.swipeRight()
            } else {
              this.swipeLeft()
            }
          } else {
          // 复位
            this.swipeNot()
          }
        },
        onDown: () => {
        // 阻止拖动触发
          if (this.isRun || this.swipeDisable) return false
        },
        onStart: () => {
          timer.stop()
          boxW = this.boxW
          offset = boxW / 3
        },
        onMove: (toX) => {
          let moveLength = this.moveLength = this.moveLength + toX
          this.move(moveLength - this.currFakeIndex * boxW)
        },
        onEnd () {
          timer.start()
        }
      })
    },
    // 向左滑动，向左移动
    // type, 自定义类型，可区别非事件触发情况
    swipeLeft () {
      let i = this.currFakeIndex
      i++
      this.change(i)
      this.animateActive()
      this.moveByIndex(i)
    },
    // 向右滑动，向右移动
    swipeRight () {
      let i = this.currFakeIndex
      i--
      this.change(i)
      this.animateActive()
      this.moveByIndex(i)
    },
    swipeNot () {
      this.animateActive()
      this.moveByIndex(this.currFakeIndex)
    },
    animateActive () {
      let { eMove } = this
      let { classList } = eMove
      this.isRun = true
      classList.add('animated')
      transitionendOnce(eMove, () => {
        classList.remove('animated')
        this.adjust()
        this.isRun = false
      })
    },
    change (i) {
      this.isChange = true
      // this.changeBtn(i)
      this.loadImg(i)

      this.currFakeIndex = i
    },
    adjust () {
      let { currFakeIndex, count, boxW } = this
      this.moveLength = 0

      if (this.isChange) {
        if (currFakeIndex > count) {
        // 第一个情况
          this.loadImg(1)
          this.move(-boxW)
          this.currFakeIndex = 1
        } else if (currFakeIndex === 0) {
        // 最后一个情况
          this.loadImg(count)
          this.move(-boxW * count)
          this.currFakeIndex = count
        }

        this.onComplete()

        this.isChange = false
      }
    },
    loadImg () {},
    onComplete () {}
  }
}
</script>

<style scoped>
.banner {
  height: 100%;
  background-color: #000;
  overflow: hidden;
  position: relative;
  .move {
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .move li {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;

    img {
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
  .animated {
    transition:transform 0.3s ease;
  }

}

</style>
