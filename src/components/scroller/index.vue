<template>
  <div class="box">
    <div class="move">
    <slot/>
    </div>
    <div class="bar-box"><b class="bar"></b></div>
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

    const cont = this.cont = new Cont({
      elem,
      eMove,
      onMove (x) {
        bar.move(x)
      }
    })

    const bar = this.bar = new Bar({
      eBarBox,
      eBar,
      getRatio () {
        return cont.ratio
      }
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
<style scoped>
.box {
  position: relative;
}
/* .move {

} */
.bar-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 8px;
  background-color: #ddd;

}
.bar {
  display: block;
  width: 60px;
  height: 8px;
  background-color: #aaa;
}
</style>
