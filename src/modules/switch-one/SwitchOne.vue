<template>
  <div class="switch-one">
    <transition
      :name="switchType"
      :enter-active-class="'slide-active'"
      :leave-active-class="'slide-active'"
    >
      <div v-show="!showIndex" class="so-item">
        <LoadIco v-show="isLoad0" class="preloader" />
        <div v-show="!isLoad0&&showPage0">
          <slot :data="data0" />
        </div>
      </div>
    </transition>
    <transition
      :name="switchType"
      :enter-active-class="'slide-active'"
      :leave-active-class="'slide-active'"
    >
      <div v-show="showIndex" class="so-item">
        <LoadIco v-show="isLoad1" class="preloader" />
        <div v-show="!isLoad1&&showPage1">
          <slot :data="data1" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import LoadIco from '@/components/ico/load'
export default {
  name: 'SwitchOne',
  components: {
    LoadIco
  },
  data () {
    return {
      switchType: 'left',
      showIndex: 0,
      isLoad0: false,
      isLoad1: false,
      showPage0: false,
      showPage1: false,
      data0: {},
      data1: {}
    }
  },
  created () {
  },
  methods: {
    load (i = this.showIndex) {
      let timeId = setTimeout(() => { this['isLoad' + i] = true }, 300)
      this['showPage' + i] = false
      this.$emit('loadData', newData => {
        clearTimeout(timeId)
        this['data' + i] = newData
        this['isLoad' + i] = false
        this['showPage' + i] = true
      })
    },
    switch () {
      let i = this.showIndex = !this.showIndex * 1
      this.load(i)
    },
    switchLeft () {
      this.switchType = 'left'
      this.switch()
    },
    switchRight () {
      this.switchType = 'right'
      this.switch()
    },
    showLoad () {

    }
  }
}
</script>

<style scoped>
.switch-one{
  /*border: 2px solid #333;*/
  /*width: 200px;*/
  height: 291px;
  position: relative;
  overflow: hidden;
  .so-item{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .slide-active{
    transition:transform 0.3s ease;
    /*transition-property:transform;*/
  }
  .left-enter, .right-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .left-leave-to, .right-enter {
    transform: translate3d(-100%, 0, 0);
  }

  .preloader {
    width: 34px;
    height: 34px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -17px;
    margin-left: -17px;
  }
}

</style>
