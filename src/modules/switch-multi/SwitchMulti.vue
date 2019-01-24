<template>
  <div class="switch-one">
    <slot />
  </div>
</template>

<script>
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
    animate (index, switchType) {
      let { items } = this
      this.enter(items[index], switchType)
      this.leaveTo(items[this.showIndex], switchType)
      this.showIndex = index
    },
    setCss (el, css) {
      let { style } = el
      each(css, (v, n) => {
        style[autoprefix(n)] = v
      })
    },
    clear (el) {
      let { classList } = el
      each(this.$style, n => {
        classList.remove(n)
      })
    },
    // 向左移动进入
    async enter (el, type, end) {
      let { active, $style } = this
      let { classList } = el
      let enter = $style[type + 'Enter']
      let enterTo = $style[type + 'EnterTo']
      this.clear(el)
      classList.add(enter)
      await this.$nextTick()
      transition({
        el,
        active,
        to: enterTo,
        end: () => {
          if (enterTo) classList.add(enterTo)
        }
      })
      classList.remove(enter)
    },
    async leaveTo (el, type, end) {
      let { active, $style } = this
      let leaveTo = $style[type + 'LeaveTo']
      await this.$nextTick()
      transition({
        el,
        active,
        to: leaveTo
      })
    },
    switchLeft () {
      if (this.isRun) return
      let index = this.showIndex + 1
      if (index >= this.itemCount) index = 0
      this.animate(index, 'left')
    },
    switchRight () {
      if (this.isRun) return
      let index = this.showIndex - 1
      if (index < 0) index = this.itemCount - 1
      this.animate(index, 'right')
    },
    switch (index) {
      let { showIndex } = this
      if (index === showIndex) return
      if (index > showIndex) {
        this.animate(index, 'left')
      } else {
        this.animate(index, 'right')
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
.leftEnter,.rightLeaveTo {
  transform: translateX(100%) scale(0.8);
  opacity: 0;
}
.leftEnterTo {}
.leftLeaveTo,.rightEnter{
  transform: translateX(-100%) scale(0.8);
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
