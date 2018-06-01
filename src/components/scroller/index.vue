<template>
  <div :class="$style.box">
    <div class="move">
    <slot/>
    </div>
    <div :class="$style.barBox"><b :class="$style.bar"></b></div>
  </div>
</template>

<script>
import Cont from './cont.js'
import Bar from './bar.js'
export default {
  mounted () {
    const elem = this.$el
    const child = elem.children
    const eMove = child[0]
    const eBarBox = child[1]
    const eBar = eBarBox.children[0]
    const {$style} = this
    const styleHover = $style.hover

    const cont = this.cont = new Cont({
      elem,
      eMove,
      $style,
      onMoveBar (x) {
        bar.move(x)
      },
      onStartBar () {
        eBar.classList.add(styleHover)
      },
      onEndBar () {
        eBar.classList.remove(styleHover)
      }
    })

    const bar = this.bar = new Bar({
      eBarBox,
      eBar,
      $style,
      getRatio () {
        return cont.ratio
      }
    })

    elem.addEventListener('wheel', function (e) {
      e.preventDefault()
      cont.wheel(e.deltaY > 0)
    })
  },
  methods: {
    update () {
      this.cont.update()
      this.bar.update()
    }
  }
}
</script>

<style module>
.box {
  position: relative;
}
.barBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 8px;
  background-color: #ddd;
  opacity: 0.5;
  display: none;
}
/* .box:hover .barBox.show{
  display: block;
} */
.barBox.show{
  display: block;
}
.bar {
  display: block;
  width: 60px;
  height: 8px;
  background-color: #aaa;
}
.bar:hover,
.bar.hover {
  background-color: #666;
}
</style>
