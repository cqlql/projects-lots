<template>
  <div>
    <slot/>
  </div>
</template>

<script>
import dragx from './dragx.js'
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
const transform = autoprefix('transform')
export default {
  mounted () {
    // const vm = this
    const elem = this.$el
    const eMove = elem.children[0]

    function move (x) {
      if (x > 0) x = 0
      eMove.style[transform] = `translate3d(${x}px,0,0)`
    }

    dragx({
      elem,
      onMove: move
    })
  },
  methods: {
  }
}
</script>
