<template>
  <div>
    <div class="info">
      <h2>AnimateTransition-css动画封装</h2>
      <button @click="animeStart">动画</button>
      <button @click="animeStart2">动画2</button>
    </div>
    <div :class="$style.box">
      <div ref="eMove" :class="$style.moveBox" />
    </div>
  </div>
</template>

<script>
import transition from './transition.js'
import autoprefix from '@/modules/corejs/dom-css/autoprefix'
export default {
  data () {
    return {
      // queue: new Queue()
    }
  },
  created () {
    this.transformName = autoprefix('transform')
  },
  mounted () {
  },
  methods: {
    animeStart () {
      transition({
        el: this.$refs.eMove,
        active: this.$style.transitionActive,
        to: {
          [this.transformName]: `translateX(100%)`,
          height: '200px'
        },
        end () {
          console.log('end')
        }
      })
    },
    animeStart2 () {
      transition({
        el: this.$refs.eMove,
        active: this.$style.transitionActive,
        to: {
          [this.transformName]: `translateX(100%)`,
          height: '300px'
        },
        end () {
          console.log('end2')
        }
      })
    }
  }
}
</script>

<style module>
.info {
  padding: 0 0 10px;
}
.box {
  border: 1px solid #000;
  height: 300px;
  position: relative;
}
.moveBox {
  width: 100px;
  height: 100px;
  background-color: #000;
}
.transitionActive {
  transition: 0.3s ease;
}
</style>
