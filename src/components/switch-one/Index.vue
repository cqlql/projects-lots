<template>
  <div class="switch-one">
    <transition
      :name="switchType"
      :enter-active-class="'slide-active'"
      :leave-active-class="'slide-active'"
    >
      <div v-show="!switchState" class="so-item">
        <slot :data="data[0]" />
      </div>
    </transition>
    <transition
      :name="switchType"
      :enter-active-class="'slide-active'"
      :leave-active-class="'slide-active'"
    >
      <div v-show="switchState" class="so-item">
        <slot :data="data[1]" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    switchState: {
      type: Boolean
    },
    switchType: {
      default: 'left',
      type: String
    }
  },
  data () {
    return {
      data: {
        0: {},
        1: {}
      }
    }
  },
  watch: {
    switchState () {
      this.load()
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      this.$emit('loadData', newData => {
        this.data[this.switchState ? 1 : 0] = newData
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
