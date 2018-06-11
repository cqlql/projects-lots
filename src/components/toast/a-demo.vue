<template>
  <div>
    <button @click="count = ~~(Math.random() * 10)">改变 count</button>
    <button @click="show=!show">显示/隐藏</button>
    <!-- <VTransition group>
      <div v-for="v of count" :key="v" v-show="show">{{v}}</div>
    </VTransition> -->
    <VTransition group>
      <div class="group-item" v-for="v of count" :key="v" v-if="show">{{v}}</div>
    </VTransition>
    <transition-group
      name={name}
      enter-active-class={activeClass}
      leave-active-class={activeClass}>
      {this.$slots.default}
    </transition-group>
  </div>
</template>

<script>
import VTransition from '../v-transition'
export default {
  data () {
    return {
      show: true,
      count: 3
    }
  },
  created () {
    // console.log(this)
  },
  components: {
    VTransition
  }
}
</script>

<style scoped>
.transition-active{
  transition: 0.3s cubic-bezier(.55,0,.1,1);
  transition-property:opacity,transform;
}
</style>
