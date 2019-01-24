<template>
  <div id="app">
    <div class="box">
      <SwitchMulti
        ref="vSwitchMulti"
        active-class="t-active"
        left-class="zoom-in"
        right-class="zoom-out"
        hide-class="hide"
      >
        <div v-for="item of list" :key="item.name" class="so-item">
          {{ item.name }}Fearless Security
          Last year, Mozilla shipped Quantum CSS in Firefox, which was the culmination of 8 years of investment in Rust, a memory-safe systems programming language, and over a year of rewriting a major browser component in Rust. Until now, all major browser engines have been written in C++, mostly for performance reasons. However, with great performance comes great (memory) responsibility: C++ programmers have to manually manage memory, which opens a Pandora’s box of vulnerabilities. Rust not only prevents these kinds of errors, but the techniques it uses to do so also prevent data races, allowing programmers to reason more effectively about parallel code.
        </div>
      </SwitchMulti>
    </div>

    <button @click="switchLeft">左切换</button>
    <button @click="switchRight">右切换</button>
    <button @click="()=>switchTo(0)">1</button>
    <button @click="()=>switchTo(1)">2</button>
    <button @click="()=>switchTo(2)">3</button>
  </div>
</template>

<script>
/**
   * transitionendOnce 有待改造，支持 switch(index)
   */
// import SwitchMulti from '@/modules/switch-multi'
import SwitchMulti from './SwitchMulti'
import SwitchBase from './switch-base.js'
export default {
  components: {
    SwitchMulti
  },
  data () {
    return {
      showIndex: 0,
      switchType: 'right',
      list: [{
        name: 1
      }, {
        name: 2
      }, {
        name: 3
      }]
    }
  },
  created () {
    this.switchBase = new SwitchBase(this.list.length)
  },
  methods: {
    switchLeft () {
      this.$refs.vSwitchMulti.switchLeft()
      // this.switchBase.switchLeft()
    },
    switchRight () {
      this.$refs.vSwitchMulti.switchRight()
      // this.switchBase.switchRight()
    },
    switchTo (i) {
      this.$refs.vSwitchMulti.switch(i)
      // this.switchBase.switch(i)
    }
  }
}
</script>

<style scoped>
.box{
  border: 2px solid #000;

  width: 200px;
  height: 300px;

  /* &>>>.t-active{
    transition: 0.3s cubic-bezier(.55,0,.1,1);
    transition-property:opacity,transform;
  }
  &>>>.zoom-in-enter,&>>>.zoom-out-leave-to {
  transform: translate3d(100%, 0, 0);
  }
  &>>>.zoom-in-leave-to,&>>>.zoom-out-enter {
    transform: translate3d(-100%, 0, 0);
  } */
}
.so-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
