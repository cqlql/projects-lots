<template>
  <div class="circular-nav-rotate">
    <div class="cnr-btn" :class="{unfold:state}" @click="onClick">
      <span class="cro"></span>
      <span class="dow"></span>
    </div>
    <!-- <RotateNav :show="state"></RotateNav> -->
  </div>
</template>

<script>
import RotateNav from './RotateNav'
export default {
  name: 'circular-nav-rotate',
  data () {
    return {
      state: 1 // false 折叠 true 展开
    }
  },
  components: {
    RotateNav
  },
  methods: {
    onClick () {
      this.state = !this.state
    }
  }
}
</script>

<style scoped>
.circular-nav-rotate {
}
.cnr-btn {
  width: 55px;
  height: 55px;
  border-radius: 55px;
  background: #6cb7f8;
  position: fixed;
  right: 21px;
  bottom: 71px;
  z-index: 1;
  box-shadow: -2px 6px 6px #ced3d8;
  transition: transform 0.3s ease;
}
.cnr-btn span {
  transition: transform 0.3s ease;
}
.cro {
  position: absolute;
  top: 26px;
  left: 12px;
  background: #fff;
  width: 30px;
  height: 3px;
}
.dow {
  position: absolute;
  left: 26px;
  top: 12px;
  background: #fff;
  width: 3px;
  height: 30px;
}
.cnr-btn.unfold {
  transform: translateY(50px);
}
.cnr-btn.unfold span {
  transform: rotate(45deg);
}
</style>
