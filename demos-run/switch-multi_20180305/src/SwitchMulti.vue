<template>
  <div class="switch-one">
    <slot/>
  </div>
</template>

<script>
// 再此调用会清除之前的，保证值绑定执行一次
function transitionendOnceOnly (elem, cb) {
  function removeEventListener (transitionend) {
    elem.removeEventListener('transitionend', transitionend)
    elem.removeEventListener('webkitTransitionEnd', transitionend)
  }

  // 清除之前的
  removeEventListener(elem._x_transitionendOnceOnlyEnd || function () {})

  let transitionend = (e) => {
    removeEventListener(transitionend)
    cb()
  }
  elem.addEventListener('transitionend', transitionend)
  elem.addEventListener('webkitTransitionEnd', transitionend)
  elem._x_transitionendOnceOnlyEnd = transitionend
}

export default {
  name: 'switch-one',
  props: {
    activeClass: {
      type: String,
      default: 'slide-active'
    },
    leftClass: {
      type: String,
      default: 'left'
    },
    rightClass: {
      type: String,
      default: 'right'
    },
    hideClass: {
      type: String,
      default: 'hide'
    }
  },
  data () {
    return {
      showIndex: 0,
      data0: {},
      data1: {}
    }
  },
  mounted () {
    let items = this.items = this.$el.children
    this.itemCount = items.length
    items[this.showIndex].classList.remove('hide')
  },
  methods: {
    animate (i, switchType, animateEnd) {
      let { items } = this
      this.animateCount = 2
      this.enter(items[i], switchType, () => {
        if (--this.animateCount) return
        animateEnd()
      })
      this.leaveTo(items[this.showIndex], switchType, () => {
        if (--this.animateCount) return
        animateEnd()
      })
    },
    enter (elem, type, end) {
      let {activeClass} = this
      let { classList } = elem

      elem.className = `s-item ${type}-enter`
      setTimeout(function () {
        classList.add(activeClass)
        classList.remove(type + '-enter')
        transitionendOnceOnly(elem, function () {
          classList.remove(activeClass)
          end()
        })
      }, 1)
    },
    leaveTo (elem, type, end) {
      let {activeClass} = this
      let { classList } = elem

      elem.className = `s-item ${activeClass} ${type}-leave-to`
      transitionendOnceOnly(elem, function () {
        classList.remove(activeClass)
        classList.remove(type + '-leave-to')
        classList.add('hide')
        end()
      })
    },
    excu (type, index) {
      this.isRun = true
      this.animate(index, type, () => {
        this.isRun = false
      })
      this.showIndex = index
    },
    switchLeft () {
      let index = this.showIndex + 1
      if (index >= this.itemCount) index = 0
      this.excu(this.leftClass, index)
    },
    switchRight () {
      let index = this.showIndex - 1
      if (index < 0) index = this.itemCount - 1
      this.excu(this.rightClass, index)
    },
    switchTo (index) {
      let {showIndex} = this
      if (index === showIndex) return
      if (index > showIndex) {
        this.excu(this.leftClass, index)
      } else {
        this.excu(this.rightClass, index)
      }
    }
  }
}
</script>

<style scoped>
.switch-one {
  position: relative;
  height: 100%;
  overflow: hidden;
  .s-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .hide {
    transform: translate3d(100%, 0, 0);
  }
/*   .transition-active {
    transition: 0.3s ease;
    transition-property:opacity,transform;
  }
  .left-enter,
  .right-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .left-leave-to,
  .right-enter {
    transform: translate3d(-100%, 0, 0);
  } */
}
</style>
