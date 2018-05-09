<template>
  <div class="switch-one">
    <transition :name="switchType"
                :enter-active-class="'slide-active'"
                :leave-active-class="'slide-active'">
      <div v-show="!showIndex" class="so-item">
        <slot :data="data0"></slot>
      </div>
    </transition>
    <transition :name="switchType"
                :enter-active-class="'slide-active'"
                :leave-active-class="'slide-active'">
      <div v-show="showIndex" class="so-item">
        <slot :data="data1"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'switch-one',
    props: {
      showIndex: Number,
      switchType: {}
    },
    data () {
      return {
        data0: {},
        data1: {}
      }
    },
    created () {
      let name = 'data' + this.showIndex
      this.$emit('loadData', newData => {
        this[name] = newData
      })
    },
    watch: {
      showIndex (i) {
        let name = 'data' + i
        this[name] = []
        this.$emit('loadData', newData => {
          this[name] = newData
        })
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
  }

</style>
