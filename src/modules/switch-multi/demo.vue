<template>
  <div id="app">
    <div class="box">
      <SwitchMulti ref="vSwitchMulti"
        activeClass="t-active"
        leftClass="zoom-in"
        rightClass="zoom-out"
        hideClass="hide">
        <div class="so-item hide" v-for="item of list" :key="item.name">
          {{item.name}}
        </div>
      </SwitchMulti>
    </div>

    <button @click="switchLeft">左切换</button>
    <button @click="switchRight">右切换</button>
    <button @click="switchTo">1</button>
    <button @click="switchTo">2</button>
    <button @click="switchTo">3</button>
  </div>
</template>

<script>
  /**
   * transitionendOnce 有待改造，支持 switch(index)
   */
  // import SwitchMulti from '@/modules/switch-multi'
  import SwitchMulti from './SwitchMulti'
  export default {
    data () {
      return {
        switchIndex: 0,
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
    components: {
      SwitchMulti
    },
    methods: {
      switchLeft () {
        this.$refs.vSwitchMulti.switchLeft()
      },
      switchRight () {
        this.$refs.vSwitchMulti.switchRight()
      },
      switchTo (e) {
        this.$refs.vSwitchMulti.switchTo(e.target.innerHTML - 1)
      }
    }
  }
</script>

<style scoped>
.box{
  border: 2px solid #000;

  width: 200px;
  height: 300px;


  &>>>.t-active{
    transition: 0.3s cubic-bezier(.55,0,.1,1);
    transition-property:opacity,transform;
  }
  &>>>.zoom-in-enter,&>>>.zoom-out-leave-to {
  /* opacity: 0;
  transform: scale(0.8); */
  transform: translate3d(100%, 0, 0);
  }
  &>>>.zoom-in-leave-to,&>>>.zoom-out-enter {
    /* opacity: 0;
    transform: scale(1.2); */
    transform: translate3d(-100%, 0, 0);
  }
}


</style>
