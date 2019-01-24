<template>
  <div>
    <VMask v-if="isShow" @click="close" />
    <transition name="up">
      <div v-if="isShow" class="slide-select">
        <SlideSelectBase ref="vSlideSelectBase" />
        <BtnsBar @cancel="close" @confirm="confirm" />
      </div>
    </transition>
  </div>
</template>

<script>
import SlideSelectBase from './SlideSelectBase.vue'
import BtnsBar from './BtnsBar.vue'
import VMask from '@/components/base/VMask.vue'
export default {
  components: {
    SlideSelectBase,
    BtnsBar,
    VMask
  },
  data () {
    return {
      isShow: 0
    }
  },
  methods: {
    confirm () {
      if (this.$refs.vSlideSelectBase.confirm()) {
        this.close()
      }
    },
    close () {
      this.isShow = 0
    },
    async show (options) {
      this.isShow = 1
      await this.$nextTick()

      let { onConfirm } = options
      if (onConfirm) this.onConfirm = onConfirm
      this.$refs.vSlideSelectBase.setOptions(options)
    }
  }
}
</script>

<style scoped>
.slide-select {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  opacity: 1;
}
.up-enter-active,
.up-leave-active {
  transition: 0.2s;
  transition-property: transform;
}
.up-enter,
.up-leave-to {
  transform: translate3d(0, -99%, 0);
}
.s-bar {
  border-bottom: 0;
  border-top: 1px solid #ddd;
}
</style>
