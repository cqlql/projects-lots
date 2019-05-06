<template>
  <div>
    <VMask v-show="isShow" @click="close" />
    <transition name="up">
      <div v-if="isShow" class="slide-select">
        <BtnsBar :btns="btns" />
        <SlideSelectBase ref="vSlideSelectBase" />
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
  props: {
    btns: {
      type: Array,
      default: function () {
        return [
          {
            name: '取消',
            style: 'gray',
            fn: () => {
              this.close()
            }
          },
          {
            name: '确定',
            fn: () => {
              this.confirm()
            }
          }
        ]
      }
    }
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
    show (options) {
      this.isShow = 1
      this.$emit('show')
      if (options) {
        this.setOptions(options)
      }
    },
    async setOptions (options) {
      await this.$nextTick()
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
  bottom: 0;
  z-index: 9;
}
.up-enter-active,
.up-leave-active {
  transition: 0.2s;
  transition-property: transform;
}
.up-enter,
.up-leave-to {
  transform: translate3d(0, 99%, 0);
}
</style>
