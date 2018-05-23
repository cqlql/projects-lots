<template>
  <div :class="$style.preloaderFull" v-show="show1">
    <VMask v-show="mask && show2"/>
    <div :class="$style.preloaderModal" v-show="show2">
      <LoadIco color="white" :class="$style.preloader" />
    </div>
  </div>
</template>

<script>
import LoadIco from '@/components/load-ico'
import VMask from '@/components/base/VMask'
export default {
  data () {
    return {
      show1: false,
      show2: false,
      mask: false
    }
  },
  components: {
    LoadIco,
    VMask
  },
  created () {
    // 不同步的状态
    this.isShow = false // 避免重复触发
    this.timeId = null
  },
  methods: {
    show ({ mask = false, time = 200 } = {}) {
      if (this.isShow) return
      this.isShow = true

      this.mask = mask
      this.show1 = true
      let ex = () => {
        this.show2 = true
      }

      if (time) {
        this.timeId = setTimeout(ex, time)
      } else {
        ex()
      }
    },
    hide () {
      clearTimeout(this.timeId)
      this.isShow = this.show2 = this.show1 = false
    }
  }
}
</script>

<style module>
/*满屏加载*/
.preloaderFull {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
}

/* .mask {
  background-color: rgba(255, 255, 255, 0.5);
} */
.preloaderModal {
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 8px;
  height: 34px;
  margin-left: -25px;
  margin-top: -25px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99;
  border-radius: 5px;
}
.preloader {
  width: 34px;
  height: 34px;
}
</style>

