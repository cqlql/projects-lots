<template>
  <VTransition>
  <div v-show="isShow" :class="$style['msg-simple']">{{msg}}</div>
  </VTransition>
</template>

<script>
import VTransition from '@/components/v-transition'
export default {
  data () {
    return {
      isShow: false,
      msg: ''
    }
  },
  methods: {
    show (msg) {
      this.msg = msg
      this.isShow = true
      clearTimeout(this.stopId)
      this.stopId = setTimeout(() => { this.isShow = false }, 1200)
    }
  },
  components: {
    VTransition
  }
}
</script>

<style module>
.msg-simple {
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);

  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 4px 10px;
  font-size: 14px;
  line-height: 1.2;

  max-width: 86%;
  overflow: hidden;
  text-overflow: ellipsis;

  border-radius: 3px;
  z-index: 100;
}
</style>
