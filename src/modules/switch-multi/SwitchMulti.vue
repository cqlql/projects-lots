<template>
  <div class="switch-one">
    <slot />
  </div>
</template>

<script>
import transitionendOnce from '@/modules/corejs/animation/transitionend-once.js'
import transition from './transition.js'
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
import each from '@/modules/corejs/each/each-obj'
export default {
  name: 'SwitchOne',
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
      active: this.$style.transitionActive,
      showIndex: 0
    }
  },
  created () {
    this.transformName = autoprefix('transform')
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
      this.leftEnter(items[i])
      this.leftLeaveTo(items[this.showIndex])
    },
    setCss (el, css) {
      let { style } = el
      each(css, (v, n) => {
        style[autoprefix(n)] = v
      })
    },
    // 向左移动进入
    async leftEnter (el, type, end) {
      let { active, $style } = this
      let { classList } = el
      let { leftEnter, leftEnterTo, hide } = $style
      classList.remove(hide)
      classList.add(leftEnter)
      await this.$nextTick()
      transition({
        el,
        active,
        to: leftEnterTo
      })
      classList.remove(leftEnter)
    },
    async leftLeaveTo (el, type, end) {
      let { active, $style } = this
      let { classList } = el
      let { leftLeaveTo, hide } = $style
      await this.$nextTick()
      transition({
        el,
        active,
        to: leftLeaveTo,
        end: () => {
          classList.add(hide)
        }
      })
    },
    excu (type, index) {
      this.animate(index)
      this.showIndex = index
    },
    switchLeft () {
      if (this.isRun) return
      let index = this.showIndex + 1
      if (index >= this.itemCount) index = 0
      this.excu(this.leftClass, index)
    },
    switchRight () {
      if (this.isRun) return
      let index = this.showIndex - 1
      if (index < 0) index = this.itemCount - 1
      this.excu(this.rightClass, index)
    },
    switch (index) {
      let { showIndex } = this
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

<style module>
.transitionActive {
  transition: 0.3s ease;
  transition-property:opacity,transform;
}
.leftEnter {
  transform: translateX(100%) scale(0.8);
  opacity: 0;
}
.leftEnterTo {
  /* transform: translateX(0);
  opacity: 1; */
}
.leftLeaveTo{
  transform: translateX(-100%) scale(0.8);
  opacity: 0;
}
.hide {
  transform: translateX(-100%);
  opacity: 0;
}
</style>

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
