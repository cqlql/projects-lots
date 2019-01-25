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
    active: {
      type: String,
      default: function () { return this.$style.transitionActive }
    },
    leftEnter: {
      type: String,
      default: function () { return this.$style.leftEnter }
    },
    rightEnter: {
      type: String,
      default: function () { return this.$style.rightEnter }
    },
    leftLeaveTo: {
      type: String,
      default: function () { return this.$style.leftLeaveTo }
    },
    rightLeaveTo: {
      type: String,
      default: function () { return this.$style.rightLeaveTo }
    },
    leftEnterTo: {
      type: String,
      default: ''
    },
    rightEnterTo: {
      type: String,
      default: ''
    },
    noClear: {
      type: RegExp,
      default: /./
    }
  },
  data () {
    return {
      // active: this.$style.transitionActive,
      // leftEnter: this.$style.leftEnter,
      // leftEnterTo: this.$style.leftEnterTo,
      // rightEnter: this.$style.rightEnter,
      // rightEnterTo: this.$style.rightEnterTo,
      // leftLeaveTo: this.$style.leftLeaveTo,
      // rightLeaveTo: this.$style.rightLeaveTo,
      showIndex: 0
    }
  },
  mounted () {
    this.transformName = autoprefix('transform')

    let items = this.items = this.$el.children
    let total = this.total = items.length

    // 初始显示 showIndex 项
    let { showIndex } = this
    let { hide } = this.$style
    for (let i = total; i--;) {
      if (i === showIndex) continue
      let { classList } = items[i]
      classList.add(hide)
    }
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
      let { noClear } = this
      let { classList } = el
      for (let i = classList.length; i--;) {
        let v = classList[i]
        noClear.test(v) || classList.remove(v)
      }
      (el._removeTransitionEnd || function () {})()
      delete el._removeTransitionEnd
      // classList.forEach(v => {
      //   console.log(v)
      //   if (noClear.test(v)) return
      //   console.log('删除' + v)
      //   classList.remove(v)
      // })
    },
    enter (el, type, end) {
      let { active } = this
      let { classList } = el
      let enter = this[type + 'Enter']
      let enterTo = this[type + 'EnterTo']
      this.clear(el)
      classList.add(enter)
      setTimeout(() => {
        transition({
          el,
          active,
          to: enterTo
        })
        classList.remove(enter)
      }, 1)
    },
    leaveTo (el, type, end) {
      let { active } = this
      let leaveTo = this[type + 'LeaveTo']
      setTimeout(() => {
        transition({
          el,
          active,
          to: leaveTo
        })
      }, 1)
    },
    switchLeft () {
      let index = this.showIndex + 1
      if (index >= this.total) index = 0
      this.animate(index, 'left')
    },
    switchRight () {
      let index = this.showIndex - 1
      if (index < 0) index = this.total - 1
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
  transition: .3s ease;
  transition-property:opacity,transform;
}
.leftEnter,.rightLeaveTo {
  transform: translateX(100%);
}
/* .leftEnterTo,.rightEnterTo {
  z-index: 1;
} */
.rightEnter,.leftLeaveTo {
  transform: translateX(-100%);
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
