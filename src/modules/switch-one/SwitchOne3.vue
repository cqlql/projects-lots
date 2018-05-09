<template>
  <div class="switch-one">
    <div ref="item0" class="so-item">
      <slot :data="data0"></slot>
    </div>
    <div ref="item1" class="so-item hide">
      <slot :data="data1"></slot>
    </div>
  </div>
</template>

<script>
import transitionendOnce from '@/modules/corejs/animation/transitionend-once.js'

// 一次队列：队列只暂存最新的一个
// class QueueOne {
//   constructor () {
//     this.q = []
//     this.isRun = false
//   }
//   excu (fn) {
//     this.q[0] = fn
//     this.start()
//   }
//   start () {
//     if (this.isRun) return
//     let fn = this.q.shift()
//     if (fn === undefined) return false
//     this.isRun = true
//     fn(() => {
//       this.isRun = false
//       return this.start()
//     })
//   }
// }

// let queueOne = new QueueOne()
// queueOne.excu(done => {
//   this.loadData(i)
//   this.animate(i, done)
// })
export default {
  name: 'switch-one',
  data () {
    return {
      showIndex: 0,
      data0: {},
      data1: {}
    }
  },
  methods: {
    loadData (i) {
      let name = 'data' + i
      // this[name] = []
      this.$emit('loadData', newData => {
        this[name] = newData
      })
    },
    animate (i, switchType, animateEnd) {
      let { $refs } = this
      this.animateCount = 2
      this.enter($refs['item' + i], switchType, () => {
        if (--this.animateCount) return
        animateEnd()
      })
      this.leaveTo($refs['item' + (!i * 1)], switchType, () => {
        if (--this.animateCount) return
        animateEnd()
      })
    },
    enter (elem, type, end) {
      let { classList } = elem
      classList.remove('hide')
      classList.add(type + '-enter')
      setTimeout(function () {
        classList.add('slide-active')
        classList.remove(type + '-enter')
        transitionendOnce(elem, function () {
          classList.remove('slide-active')
          end()
        })
      }, 1)
    },
    leaveTo (elem, type, end) {
      let { classList } = elem
      classList.add('slide-active')
      classList.add(type + '-leave-to')
      transitionendOnce(elem, function () {
        classList.remove('slide-active')
        classList.remove(type + '-leave-to')
        classList.add('hide')
        end()
      })
    },
    excu (type) {
      if (this.isRun) return
      let index = this.showIndex = !this.showIndex * 1
      this.loadData(index)
      this.isRun = true
      this.animate(index, type, () => {
        this.isRun = false
      })
    },
    switchLeft () {
      this.excu('left')
    },
    switchRight () {
      this.excu('right')
    }
  }
}
</script>

<style scoped>
.switch-one {
  /*border: 2px solid #333;*/
  /*width: 200px;*/
  height: 291px;
  position: relative;
  overflow: hidden;
  .so-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .slide-active {
    transition: transform 0.3s ease;
    /*transition-property:transform;*/
  }
  .hide {
    /* opacity: 0;
    pointer-events: none; */
    transform: translate3d(100%, 0, 0);
  }
  .left-enter,
  .right-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .left-leave-to,
  .right-enter {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
